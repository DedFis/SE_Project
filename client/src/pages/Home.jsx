import Banner from "../components/Banner";
import Categorys from "../components/Categorys";
import Headers from "../components/Headers";

const Home = () => {
    return ( 
        <div className="w-full">
            <Headers />
            <Banner />
            <div className="my-4">
                <Categorys />
            </div>
        </div>
     );
}
 
export default Home;