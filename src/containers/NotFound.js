import React, { Component } from 'react';

class NotFound extends Component {
    render() {
        return(
            <section>
                <div className="row">
                    <div className="col-md-12">
                        <h2>Error - 404</h2>

                        <p>The resource was not found</p>
                    </div>
                </div>
            </section>
        );
    }
}

export default NotFound;
