
import React from 'react';
import Logo from '../../images/logo.webp'
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link , useNavigate} from 'react-router-dom';
import ROUTES from '../../constants/routes';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import LoadingOverlay from 'react-loading-overlay-nextgen';
import {AuthApi} from '../../apis/identity/auth'
import { toast } from "react-toastify";
import {useDispatch, useSelector} from 'react-redux';
import queryString from 'query-string';
import {userLoggedIn} from '../../redux/actions/user.actions';

const Login = () => {
    const [viewPassword, setViewPassword] = React.useState(false);
    const [formData, setFormData] = React.useState({email:'', password:''});
    const [validated, setValidated] = React.useState(false);
    const [isDisabled, setisDisabled] = React.useState(true)
    const statusLoading = useSelector((state) => state.global.status);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            submitForm()
        }
        setValidated(true);
      };
    const onChangeInput = (event) => {
        let target = event.target;
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    }
    const submitForm =  async () => {
        await AuthApi.login(queryString.stringify(formData)).then((res) => {
            if(res?.length > 0) {
                dispatch(userLoggedIn(res[0]));
                toast.success("Login up success.", {
                    autoClose: 2000,
                    position: "top-center",
                });
                navigate('/');
            }
            else {
                toast.error("Email or password is incorrect.", {
                    autoClose: 2000,
                    position: "top-center",
                });
            }
        }).catch((err) => {
            toast.error("Login failed.", {
                autoClose: 2000,
                position: "top-center",
            });
        })
    }
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
                        <h4 className="text-muted text-center font-size-18"><b>Welcome back!</b></h4>
                        <div className="p-3">
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group as={Col} md="12" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    name="email" 
                                    type="email" 
                                    value={formData.email}
                                    placeholder="Your email" 
                                    required pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                                    onChange={onChangeInput}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Enter a valid email address
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" className="mb-3 position-relative">
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    name='password'
                                    value={formData.password}
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
                                    Don’t have an account? 
                                    <span className='custom-text-sign'>
                                        <Link to={ROUTES.SIGNUP}>
                                            Sign Up
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

export default Login;