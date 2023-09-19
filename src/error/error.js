import React from 'react';

class Error extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            haveanerror: false,
            errorMessage: ''
        };
    }

    static getDerivedStateFromError() {
        return { 
            haveanerror: true, 
            errorMessage: 'Were in the process of resolving the issue. Kindly refresh the page.',
            
         };
    }

    render() {
        if (this.state.haveanerror) {
            return (
                <div className="px-4 py-2 m-4">
                    <h1 className="mt-2 font-bold font-lato-300 text-lg mb-1">Uh-oh! Something went wrong:</h1>
                    <p>{this.state.errorMessage}</p>
                    <button
                        className="px-4 py-2 rounded bg-blue-feedback active:outline text-sm"
                        onClick={() => (window.location.href = '/dashboard')}
                    >
                        Refresh page
                    </button>
                </div>
            );
        } 
        //eslint-disable-next-line
        return this.props.children;
    }
}

export default Error;
