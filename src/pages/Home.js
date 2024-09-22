import Information from "../components/Information/Information";
import Showcase from "./../components/Showcase/Showcase";
import About from "./../components/About/About";
import Card from "./../components/Card/Card";
import ScoreRanking from "./../components/ScoreRanking/ScoreRanking";
import Partners from "./../components/Partners/Partners";
import Future from "./../components/Future/Future";
import UniversityAdvertisements from "../components/UniversityAdvertisements/UniversityAdvertisements";
const Home = () => {
  return (
    <>
      {/* <Suspense
        fallback={
          <div>
            <Loading />x
          </div>
        }
      > */}
      <Showcase />
      <Partners />
      <About />
      {/* <UniversityAdvertisements /> */}
      <Card />
      <Information />
      <ScoreRanking />
      <Future />
      {/* </Suspense> */}
    </>
  );
};

export default Home;
