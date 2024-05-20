import Layout from "../../componemts/layout";
import { Link } from "react-router-dom";
const PageNotFound = () => {
    return (
       <Layout>
              <div className="my-5 pt-5">
              <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="ex-page-content text-center">
                                    <h1>404!</h1>
                                    <h3>Sorry, page not found</h3><br />
            
                                    <Link to={"/"}>
                                        <a className="btn btn-info mb-5 waves-effect waves-light">Back to home</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
              </div>
       </Layout>
    )
}

export default PageNotFound;