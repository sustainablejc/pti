import { Container, Col, Row } from 'react-bootstrap';

export function Resources(props) {
    
    return (
        <Container>
            <Row>
                <Col style={{ paddingBottom: "10px", textAlign: "center" }}>
                <h4>Here are some sites, apps and other favorite resources of ours you may want to check out.</h4>
                </Col>
            </Row>
            <Row style={{ paddingTop: "5px" }}>
                <Col style={{ textAlign: "center" }}>
                    <h3><a href="#">SJC Suggested Apps!</a></h3>
                    <p>Visit this link to see the SJC suggested apps!</p>
                </Col>
            </Row>
            <Row style={{ paddingTop: "5px" }}>
                <Col style={{ textAlign: "center" }}>
                    <h3><a href="#">Resource Recovery for Plastic</a></h3>
                    <p>How a materials recovery facility will sort flexible plastics</p>
                </Col>
            </Row>
            <Row style={{ paddingTop: "5px" }}>
                <Col style={{ textAlign: "center" }}>
                    <h3><a href="#">SJC Composting Project</a> & <a href="#"> SJC Eco-Ambassador Program</a>
                    </h3>
                    <p>Become champions of <i>waste prevention, recycling, and diversion</i></p>
                </Col>
            </Row>
            <Row style={{ paddingTop: "5px" }}>
                <Col style={{ textAlign: "center" }}>
                    <h3><a href="#">SJC Plastics & Materials Waste Recycling Program</a></h3>
                    <p>A good place to start is to say NO to single use plastic materials!</p>
                </Col>
            </Row>
        </Container>
    );
}
