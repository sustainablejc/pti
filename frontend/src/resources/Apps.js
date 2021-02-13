import { Container, Col, Row } from 'react-bootstrap';

export function Apps(props) {
    return (
        <Container>
            <Row>
                <Col style={{ textAlign: "center" }} sm="12" md="6">
                    <h3><a href="#">Recycle Coach</a></h3>
                    <p>Helps you drastically reduce contamination & become a force for good in the fight against climate change</p>

                    <h3><a href="#">PlantJammer</a></h3>
                    <p>A virtual cooking assistant that offers custom recipes based on leftover ingredients in your fridge</p>

                    <h3><a href="#">Food Rescue Us</a></h3>
                    <p>Connecting fresh, usable, excess food free of charge with hunger relief organizations</p>
                </Col>

                <Col sm="12" md="6">
                    <iframe
                        loading="lazy"
                        src="https://app.my-waste.mobi/US/NJ/Jersey_City?resize"
                        style={{ width: "100%", height: "80vh", overflow: "hidden"}} frameborder="0" data-mce-fragment="1" id="iFrameResizer0" ></iframe>
                </Col>
            </Row>
        </Container>
    );
}
