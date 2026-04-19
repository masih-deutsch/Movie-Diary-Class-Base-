import React, { Component } from 'react'

class Page extends Component {
    state = {
        page: 1
    }

    render() {
        return (
            <div className="flex justify-center items-center mt-10 mb-15">
                <div className="join">
                    <button onClick={this.dec.bind(this)} className="join-item btn btn-primary">«</button>
                    <button className="join-item btn">Page {this.state.page}</button>
                    <button onClick={this.inc.bind(this)} className="join-item btn btn-secondary">»</button>
                </div>
            </div>
        );
    }

    inc() {
        const newPage = this.state.page + 1;
        this.setState({ page: newPage });
        this.props.pageData(newPage);
    }

    dec() {
        if (this.state.page > 1) {
            const newPage = this.state.page - 1;
            this.setState({ page: newPage });
            this.props.pageData(newPage);
        } else {
            this.setState({ page: 1 });
            this.props.pageData(1);
        }
    }
}

export default Page;