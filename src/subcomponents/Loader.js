import React from 'react';

import ReactModal from 'react-modal';

import BounceLoader from 'react-spinners/BounceLoader';

ReactModal.setAppElement('#main');

const override = {
    display: "block",
    margin: "0 auto",
    border: "0px solid #000000"
}

export default function Loader(props){
    return  <div>
                <ReactModal 
                    isOpen={props.isLoading}
                    className="LoadingModal"
                    overlayClassName="LoadingOverlay"
                    contentLabel="Minimal Modal Example">

                    <BounceLoader
                        css={override}
                        sizeUnit={"px"}
                        size={80}
                        color={'#2E86C1'}
                        loading={props.isLoading}
                    />

                </ReactModal>
            </div>
}