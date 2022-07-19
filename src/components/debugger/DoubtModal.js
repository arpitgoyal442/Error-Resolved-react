
import StarFilled from "@heroicons/react/solid/StarIcon";
import StarEmpty from "@heroicons/react/outline/StarIcon";
function modal({doubtInfo}){


    return(

        <div className="modal">


             <h2 className="doubt_modal_studentname">Arpit Goyal <span>
							<StarFilled className="h-6 w-6 text-darkgray-400 star" />
							<StarFilled className="h-6 w-6 text-darkgray-400 star" />
							<StarFilled className="h-6 w-6 text-darkgray-400 star" />
							<StarEmpty className="h-6 w-6 text-darkgray-400 star" />
							<StarEmpty className="h-6 w-6 text-darkgray-400 star" />
						</span> </h2>
             
            

            <h2>Short Description</h2>
            <p> {doubtInfo.shortDescription}</p>

            <h2>Long Description</h2>
            <p>{doubtInfo.longDescription}</p>
            



        </div>
    )





}

export default modal;