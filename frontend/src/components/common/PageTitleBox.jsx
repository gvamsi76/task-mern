import React from "react";
import { Row, Col, Container } from "react-bootstrap";

const PageTitleBox = ({
  name,
  pageTitle,
  rightItem,
  title,
}) => {
  return (
    <Container>
      <Row>
        <Col>
          <div className="page-title-box align-items-end">
            <div>
              <h4 className="mb-1">{title}</h4>
              <h6 className="page-title text-secondary opacity-75 fw-normal">
                {pageTitle}
              </h6>
            </div>
            <div className="page-title-right">{rightItem}</div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PageTitleBox;
