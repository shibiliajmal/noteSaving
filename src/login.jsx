import image from "./assets/logo.jpg";
import { useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate();
  return (
    <div>
      <div className="border-r-4">
        <img src={image} className="h-[33rem]"></img>
      </div>

      <div className="pt-10">
        <p className="text-3xl flex pl-10 text-orange-500">Create & design</p>
        <p className="text-4xl font-extrabold pl-10 text-orange-500">
          your notes Easily
        </p>
        <div className="m-auto w-[95%] pt-2" onClick={
            ()=>navigate("/note")
        
        }>
        <button className="btn bg-orange-400 text-white w-full mt-10 text-2xl font-semibold h-[3.5rem]">Get Started</button>
        </div>
       
      </div>
    </div>
  );
}

export default Login;
