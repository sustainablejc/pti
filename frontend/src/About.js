import { Carousel, Container, Row } from 'react-bootstrap';

import about1 from './images/about-1.png';
import about2 from './images/about-2.png';
import about3 from './images/about-3.png';

import carousel1 from './images/carousel-1.png';
import carousel2 from './images/carousel-2.png';
import carousel3 from './images/carousel-3.png';

export function About(props) {
    return (<div className="about">
        <Container>
            <Row>
                <Carousel style={{ marginTop: "2rem", width: '100%' }}> 
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={carousel1}
                            alt=""
                        />
                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={carousel2}
                            alt=""
                        />
                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={carousel3}
                            alt=""
                        />
                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Row>
        </Container>
    </div>);
}
