import DifficultyTable from "~/pages/table";

const Main = () => {
  return <DifficultyTable></DifficultyTable>;
};

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default Main;
