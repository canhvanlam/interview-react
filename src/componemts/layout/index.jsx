import React from 'react';
import Header from "../header";
import LoadingOverlay from 'react-loading-overlay-nextgen';
import {useDispatch, useSelector} from 'react-redux';

const Layout = ({
    children,
    onChange,
    value,
    submit, 
    onChangeSort,
    isActiveSort
}) => {
    const statusLoading = useSelector((state) => state.global.status);
    return (
        
        <LoadingOverlay active={statusLoading} spinner>
            <Header 
                onChange={onChange}
                value={value}
                submit={submit}
                onChangeSort={onChangeSort}
                isActiveSort={isActiveSort}
            />
            <div>
                {children}
            </div>
        </LoadingOverlay>
    )
}

export default Layout;