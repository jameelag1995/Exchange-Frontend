import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
export default function LoginUsingSocialMedia() {
    return (
        <div className="social-media">
            <span className="social-media-text">
                Or login using your social media
            </span>
            <div className="social-media-icons">
                <FaFacebookF className="sm-icon" />
                <FcGoogle className="sm-icon" />
            </div>
        </div>
    );
}
