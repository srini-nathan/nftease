import React from "react";
// reactstrap components
import { Button, UncontrolledTooltip, Input, Modal } from "reactstrap";
import Loader from "../../assets/img/test.svg";

const ConfirmCreation = (props) => {
  const [liveDemo, setLiveDemo] = React.useState(false);
  return (
    <>
      <div id="gg">
        <Button
          color="primary"
          type="button"
          onClick={() => setLiveDemo(true)}
          disabled={props.isEnabled}
        >
          <span id="submitBtn">Create My NFT</span>
        </Button>
        {props.isEnabled ? (
          <UncontrolledTooltip placement="top" target="submitBtn" delay={0}>
            Please finish filling out the necessary details of your content.
          </UncontrolledTooltip>
        ) : (
          <></>
        )}
      </div>
      <Modal isOpen={liveDemo} toggle={() => setLiveDemo(false)}>
        <div className="modal-header">
          <h4 className="modal-title" id="modal-title-default">
            <strong>Create new NFT "{props.name}"</strong>
          </h4>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setLiveDemo(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <p>
            <img alt="..." className="rounded-circle" src={Loader} />
            {/* <strong>
              You are about to publish an NFT to the blockchain network.
            </strong> */}
          </p>
          <p>Please wait</p>
        </div>
        <div className="modal-footer">
          <Button color="primary" type="button">
            Send it!
          </Button>
          <Button
            className="ml-auto"
            color="link"
            data-dismiss="modal"
            type="button"
            onClick={() => setLiveDemo(false)}
          >
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmCreation;
