import bmsjs from "~/utils/bmsjs";

export function renderBms(chart, setLine) {
  let timing = bmsjs.Timing.fromBMSChart(chart);
  let _notes = bmsjs.Notes.fromBMSChart(chart, {});
  let notes = _notes.all();

  let outputBar = [];

  // BMS info
  let songInfo = bmsjs.SongInfo.fromBMSChart(chart);
  let infoTitle = songInfo.title;
  let infoArtist = songInfo.artist;
  let infoGenre = songInfo.genre;
  let startBpm = parseFloat(chart.headers.get("bpm"));
  let infoMinBpm = startBpm,
    infoMaxBpm = startBpm;

  // Get bar length and BPM changes
  let barLength = [],
    barLengthSum = [],
    totalBeat = 0;
  let bpmChanges = {},
    bpmChangeKeys = [];

  // Bar length: Loop from 0 ~ last note's beat
  while (totalBeat <= notes[notes.length - 1].beat) {
    let beat = chart.timeSignatures.getBeats(barLength.length);
    barLength.push(beat);
    totalBeat += beat;
    barLengthSum.push(totalBeat);
  }

  // BPM changes: get events and changes
  bpmChangeKeys = timing.getEventBeats();
  for (let i in bpmChangeKeys) {
    let beat = bpmChangeKeys[i];
    bpmChanges[beat] = timing.bpmAtBeat(beat);
  }

  if (bpmChangeKeys.length === 0) {
    bpmChangeKeys = [0];
    bpmChanges = { 0: startBpm };
  }

  // min, max BPM
  for (let i in bpmChangeKeys) {
    let bpm = bpmChanges[bpmChangeKeys[i]];
    if (infoMinBpm > bpm) infoMinBpm = bpm;
    if (infoMaxBpm < bpm) infoMaxBpm = bpm;
  }

  // Split notes into bar
  let currentBar = 0;
  let bpmChangeIdx = 0,
    currentBpm = startBpm;
  let barNotes = [],
    output = [];
  let longBody = [],
    longEnd = [];

  let xtMap = {
    SC: [0, "r"],
    1: [25, "w"],
    2: [40, "b"],
    3: [55, "w"],
    4: [70, "b"],
    5: [85, "w"],
    6: [100, "b"],
    7: [115, "w"],
  };

  let notePattern =
    "<div class='note note-{t}' style='margin-top:{y}px;margin-left:{x}px'></div>";
  let longNotePattern =
    "<div class='note long note-{t}' style='margin-top:{y}px;margin-left:{x}px;height:{h}px'></div>";
  let bpmPattern =
    "<div class='bpm' style='margin-top:{y}px'><span>{v}</span></div>";

  function processBpmChange(startBeat, endBeat) {
    startBeat = startBeat || 0;
    let barLength = endBeat - startBeat;

    let changeBeat = bpmChangeKeys[bpmChangeIdx];
    let changeBpm = bpmChanges[bpmChangeKeys[bpmChangeIdx]];
    while (typeof changeBeat !== "undefined" && changeBeat < endBeat) {
      if (currentBpm === changeBpm) {
        bpmChangeIdx++;
        changeBeat = bpmChangeKeys[bpmChangeIdx];
        changeBpm = bpmChanges[bpmChangeKeys[bpmChangeIdx]];

        continue;
      }
      currentBpm = changeBpm;

      let relativeBeat = changeBeat - startBeat;
      let y = (barLength - relativeBeat) * 48 - 12;

      output.push(bpmPattern.replace("{v}", changeBpm).replace("{y}", y));

      bpmChangeIdx++;
      changeBeat = bpmChangeKeys[bpmChangeIdx];
      changeBpm = bpmChanges[bpmChangeKeys[bpmChangeIdx]];
    }
  }

  function processLong(startBeat, endBeat) {
    let thisBarLength = endBeat - startBeat;

    for (let i in longBody) {
      let body = longBody[i];

      let y, h;
      let x = xtMap[body.column][0] + 35 + 2;
      let t = xtMap[body.column][1];

      // Started and ended at this bar
      if (
        body.start >= startBeat &&
        body.start < endBeat &&
        body.end >= startBeat &&
        body.end < endBeat
      ) {
        let endRelativeBeat = body.end - startBeat;
        y = (thisBarLength - endRelativeBeat) * 48;
        h = (body.end - body.start) * 48;

        longBody[i] = undefined;
      }
      // Started at this bar but not ended
      else if (
        body.start >= startBeat &&
        body.start < endBeat &&
        body.end >= endBeat
      ) {
        y = 0;
        h = (endBeat - body.start) * 48;
      }
      // Started before and ended at this bar
      else if (
        body.start < startBeat &&
        body.end >= startBeat &&
        body.end < endBeat
      ) {
        let endRelativeBeat = body.end - startBeat;
        y = (thisBarLength - endRelativeBeat) * 48;
        h = (body.end - startBeat) * 48;

        longBody[i] = undefined;
      }
      // Started before this bar and not ended
      else {
        y = 0;
        h = thisBarLength * 48;
      }

      output.push(
        longNotePattern
          .replace("{t}", t)
          .replace("{x}", x)
          .replace("{y}", y)
          .replace("{h}", h)
      );
    }

    longBody = longBody.filter(function (b) {
      return !!b;
    });

    for (let i in longEnd) {
      let note = longEnd[i];

      if (note.beat >= startBeat && note.beat < endBeat) {
        let relativeBeat = note.beat - startBeat;
        let x = xtMap[note.column][0] + 35;
        let y = (thisBarLength - relativeBeat) * 48 - 4;
        let t = xtMap[note.column][1];

        output.push(
          notePattern.replace("{x}", x).replace("{y}", y).replace("{t}", t)
        );
      }
    }
  }

  for (let idx in notes) {
    let note = notes[idx];

    if (note.beat >= barLengthSum[currentBar]) {
      while (note.beat >= barLengthSum[currentBar]) {
        let startBeat = barLengthSum[currentBar - 1];
        let endBeat = barLengthSum[currentBar];

        processBpmChange(startBeat, endBeat);
        processLong(startBeat, endBeat);

        barNotes[currentBar] = output;
        output = [];

        currentBar++;
      }
    }

    if (typeof note.column === "undefined") continue;

    let thisBarLength = barLength[currentBar];

    let relativeBeat = note.beat - barLengthSum[currentBar - 1];

    // 노트 배치 변경
    let lineNumber = (setLine.indexOf(note.column.column) + 1).toString();

    let x = xtMap[lineNumber][0] + 35;
    let y = (thisBarLength - relativeBeat) * 48 - 4;
    let t = xtMap[lineNumber][1];

    output.push(
      notePattern.replace("{x}", x).replace("{y}", y).replace("{t}", t)
    );

    if (note.endBeat) {
      // Those are processed at bar change
      longBody.push({
        column: lineNumber,
        start: note.beat,
        end: note.endBeat,
      });
      longEnd.push({
        column: lineNumber,
        beat: note.endBeat,
      });
    }
  }

  // Leftover

  let startBeat = barLengthSum[currentBar - 1];
  let endBeat = barLengthSum[currentBar];
  let thisBarLength = endBeat - startBeat;
  processBpmChange(startBeat, endBeat);
  processLong(startBeat, endBeat);
  barNotes[currentBar] = output;

  // Print it
  let bmsInfo = {
    title: infoTitle,
    artist: infoArtist,
    genre: infoGenre,
    minBpm: infoMinBpm,
    maxBpm: infoMaxBpm,
  };

  printBms(bmsInfo, barLength, bpmChanges, barNotes);
}

function printBms(info, barLength, bpmChanges, barNotes) {
  document.querySelector(".viewer-info").innerHTML =
    "[" +
    info.genre +
    "] " +
    info.title +
    " - " +
    info.artist +
    "<br>" +
    "BPM : " +
    info.minBpm +
    " ~ " +
    info.maxBpm;

  // Notes
  var output = [];
  var outputBuffer = [];

  var maxBeatInColumn = 16;
  var beatSum = 0;

  for (var bar = 0; bar < barNotes.length; bar++) {
    var length = barLength[bar];
    var notes = barNotes[bar];

    if (beatSum + length > maxBeatInColumn) {
      var padHeight = 48 * (maxBeatInColumn - beatSum);
      outputBuffer.unshift(
        "<div class='bar empty' style='height:" + padHeight + "px'></div>"
      );

      output.push("<div class='column'>" + outputBuffer.join("") + "</div>");

      outputBuffer = [];
      beatSum = 0;
    }

    beatSum += length;

    outputBuffer.unshift(
      "<div class='bar' style='height:" +
        length * 48 +
        "px'>" +
        "<div class='bar-number'>" +
        "<span style='margin-top:" +
        (length * 24 - 10) +
        "px'>" +
        bar +
        "</span>" +
        "</div>" +
        notes.join("") +
        "</div>"
    );
  }

  // Flush
  var padHeight = 48 * (maxBeatInColumn - beatSum);
  outputBuffer.unshift(
    "<div class='bar empty' style='height:" + padHeight + "px'></div>"
  );

  output.push("<div class='column'>" + outputBuffer.join("") + "</div>");

  document.querySelector(".viewer-output").style.width =
    output.length * 200 + "px";
  document.querySelector(".viewer-output").innerHTML = output.join("");
  document.querySelector(".viewer-body").style.display = "block";
  document.querySelector(".viewer-body").style.width =
    output.length * 200 + "px";
}
