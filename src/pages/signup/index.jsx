import React from 'react';
import Logo from '../../images/logo.webp'
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate } from 'react-router-dom';
import ROUTES from '../../constants/routes';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import {AuthApi} from '../../apis/identity/auth'
import { toast } from "react-toastify";
import LoadingOverlay from 'react-loading-overlay-nextgen';
import {useDispatch, useSelector} from 'react-redux';
import {userLoggedIn} from '../../redux/actions/user.actions';
const Register = () => {
    const [viewPassword, setViewPassword] = React.useState(false);
    const [validated, setValidated] = React.useState(false);
    const [formData, setFormData] = React.useState({});
    const statusLoading = useSelector((state) => state.global.status);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onChangeInput = (event) => {
        let target = event.target;
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            submitForm()
        }
        setValidated(true);
      };
    const submitForm = async () => {
        const respons = await AuthApi.getUserByEmail(formData.email);
        if(respons?.length > 0){
            toast.error("Account already exists.", {
                autoClose: 2000,
                position: "top-center",
            });
        }
        else {
            await AuthApi.signup(formData).then((res) => {
            if(res) {
                dispatch(userLoggedIn(res));
                console.log("canhlv", res);
                toast.success("Sign up success.", {
                    autoClose: 2000,
                    position: "top-center",
                });
                navigate('/');
            }
            }).catch((err) => {
                toast.error("Sign up failed.", {
                    autoClose: 2000,
                    position: "top-center",
                });
            })
        }
    }
    console.log("statusLoading", statusLoading)
    return (
        <LoadingOverlay active={statusLoading} spinner>
            <div className="wrapper-page">
            <div className="container-fluid p-0">
                <div className="card">
                    <div className="card-body">
                        <div className="text-center mt-4">
                            <div className="mb-3">
                                <img src={Logo} height="30" className="logo-dark mx-auto" alt="logo" />
                            </div>
                        </div>
                        <h4 className="text-muted text-center font-size-18"><b>Welcome</b></h4>
                        <div className="p-3">
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group as={Col} md="12" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    name="email" 
                                    type="email" 
                                    placeholder="Your email" 
                                    required pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                                    onChange={onChangeInput}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Enter a valid email address
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" className="mb-3">
                                <Form.Label>Full name</Form.Label>
                                <Form.Control
                                    name="fullName" 
                                    type="text" 
                                    placeholder="Your full name" 
                                    required 
                                    onChange={onChangeInput}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter full name
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    name="userName" 
                                    type="text" 
                                    placeholder="Your usernam" 
                                    required 
                                    onChange={onChangeInput}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter username
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" className="mb-3 position-relative">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    name='password'
                                    type={viewPassword ? "text" : "password"} 
                                    placeholder="Your password" required 
                                    onChange={onChangeInput}
                                    />
                                <div className='eye-icon' onClick={() => setViewPassword(!viewPassword)}>
                                    <i className= {!viewPassword ? "bi bi-eye-slash" : "bi-eye"}></i>
                                </div>
                                <Form.Control.Feedback type="invalid">
                                    Please enter password
                                </Form.Control.Feedback>
                            </Form.Group>
                            <div className="form-group mb-3 text-center row mt-3 pt-1">
                                <div className="col-12">
                                    <button
                                    //disabled={!formData.emaail && !formData.password ? false : true}
                                    className="btn btn-info w-100 waves-effect waves-light text-white" type="submit" >Log In</button>
                                </div>
                            </div>
                        </Form>
                        <div className="form-group mb-3 text-center row mt-3 pt-1">
                            <div className="col-12">
                                <div className="text-muted">
                                    Already have an account?
                                    <span className='custom-text-sign'>
                                        <Link to={ROUTES.LOGIN}>
                                            Log in
                                        </Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
        </LoadingOverlay>
        
    )
}
export default Register