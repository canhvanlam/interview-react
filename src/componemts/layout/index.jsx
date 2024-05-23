import React from 'react';
import LoadingOverlay from 'react-loading-overlay-nextgen';
import {useSelector} from 'react-redux';
import  Header from '../header'
const Layout = ({
    children,
    onChange,
    value,
    submit, 
    onChangeSort,
    dataSort
}) => {
    const statusLoading = useSelector((state) => state.global.status);
    return (
        
        <LoadingOverlay active={statusLoading} spinner>
            <Header 
                onChange={onChange}
                value={value}
                submit={submit}
                onChangeSort={onChangeSort}
                dataSort={dataSort}
            />
            <div>
                {children}
            </div>
        </LoadingOverlay>
    )
}

export default Layout;