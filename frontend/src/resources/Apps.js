import { Container, Col, Row } from 'react-bootstrap';

export function Apps(props) {
    return (
        <Container className="information-page">
            <Row>
                <Col style={{ textAlign: "center" }} sm="12" md="6">
                    <h3><a href="https://recyclecoach.com/">Recycle Coach</a></h3>
                    <p>Helps you drastically reduce contamination & become a force for good in the fight against climate change</p>

                    <h3><a href="https://recipes.plantjammer.com/">PlantJammer</a></h3>
                    <p>A virtual cooking assistant that offers custom recipes based on leftover ingredients in your fridge</p>

                    <h3><a href="https://foodrescue.us/">Food Rescue Us</a></h3>
                    <p>Connecting fresh, usable, excess food free of charge with hunger relief organizations</p>
                    <h3><a href="https://www.litterati.org/">Litterati</a></h3>
                    <p>Empowering individuals to make a significant measurable impact on the environment.
</p>

                    <h3><a href="https://www.seasonalfoodguide.org/download-app">Seasonal Food Guide</a></h3>
                    <p>A free seasonal food almanac, right at your fingertips!	</p>

                    <h3><a href="https://toy-cycle.org/">Toycycle</a></h3>
                    <p>Connect locally to swap free, used toys and declutter your home while helping to reduce plastic waste.</p>

                    <h3><a href="https://findtap.com/">Tap</a></h3>
                    <p>Invites smartphone users to find nearby free public drinking fountains and water refill stations.</p>

                    <h3><a href="https://gebni.com/">Gebni</a></h3>
                    <p>Helps restaurants increase orders, reaching previously priced-out customers & efficiently moving inventory.</p>

                    <h3><a href="https://www.seafoodwatch.org/">Seafood Watch</a></h3>
                    <p>Helps you choose ocean-friendly seafood at your favorite restaurants and stores.</p>

                    <h3><a href="https://www.paperkarma.com/">Paper Karma</a></h3>
                    <p>Take back control and stop unwanted paper mail!</p>
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
