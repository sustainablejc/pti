import { Container, Col, Row } from 'react-bootstrap';

export function Resources(props) {
    
    return (
        <Container className="information-page">
            <Row>
                <Col style={{ paddingBottom: "10px", textAlign: "center" }}>
                <h4>Here are some sites, apps and other favorite resources of ours you may want to check out.</h4>
                </Col>
            </Row>
            <Row style={{ paddingTop: "5px" }}>
                <Col style={{ textAlign: "center" }}>
                    <h3><a href="https://www.sustainablejc.org/sustainability-apps">SJC Suggested Apps!</a></h3>
                    <p>Visit this link to see the SJC suggested apps!</p>
                </Col>
            </Row>
            <Row style={{ paddingTop: "5px" }}>
                <Col style={{ textAlign: "center" }}>
                    <h3><a href="https://resource-recycling.com/plastics/2018/12/05/how-a-materials-recovery-facility-will-sort-flexible-plastics/">Resource Recovery for Plastic</a></h3>
                    <p>How a materials recovery facility will sort flexible plastics</p>
                </Col>
            </Row>
            <Row style={{ paddingTop: "5px" }}>
                <Col style={{ textAlign: "center" }}>
                    <h3><a href="https://www.sustainablejc.org/projects/community-composting">SJC Composting Project</a> & <a href="https://www.sustainablejc.org/eco-ambassador-program"> SJC Eco-Ambassador Program</a>
                    </h3>
                    <p>Become champions of <i>waste prevention, recycling, and diversion</i></p>
                </Col>
            </Row>
            <Row style={{ paddingTop: "5px" }}>
                <Col style={{ textAlign: "center" }}>
                    <h3><a href="https://www.sustainablejc.org/plastics-materials-recycling-project">SJC Plastics & Materials Waste Recycling Program</a></h3>
                    <p>A good place to start is to say NO to single use plastic materials!</p>
                </Col>
            </Row>
        </Container>
    );
}
