import React, { Component } from 'react';

class listMessenger extends Component {
    render() {
        return (
            <div>
                <input className="file" type='file' id="imgSel" />

                <div id="textarea" contenteditable>
                    <img alt="" contenteditable="false" style={{ width: "45px" }} id="myimg" />
                        I look like a textarea
                </div>
            </div>
        );
    }
}
export default listMessenger;