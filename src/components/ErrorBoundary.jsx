import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError(err) {
        console.log('GetDerivedStateFromError');
        return {
            hasError: true,
        };
    }

    componentDidCatch(error, errorInfo) {
        console.log('componentDidCatch');
        // TODO: Add logging logic here, e.g., sending error info to a server
    }

    render() {
        if (this.state.hasError) {
            return <Navigate to="/404" />;
        }

        return this.props.children;
    }
}
