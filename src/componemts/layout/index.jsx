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