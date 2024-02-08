import { Link } from "react-router-dom";
import Card from "../components/shared/Card";
export default function AboutPage() {
    return (
        <Card>
            <div className="about">
                <h1>About This Project</h1>
                <p>This is a React App to leave feedback</p>
                <p>Version: 1.0.0</p>
                <p>
                    <Link to="/">Back To Home</Link>
                </p>
            </div>
        </Card>
    )
}
