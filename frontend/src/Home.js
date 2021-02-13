import { Carousel, Container, Row } from 'react-bootstrap';

import about1 from './images/about-1.png';
import about2 from './images/about-2.png';
import about3 from './images/about-3.png';

import carousel1 from './images/carousel-1.png';
import carousel2 from './images/carousel-2.png';
import carousel3 from './images/carousel-3.png';

export function Home(props) {
    return (
        <div className="about">
            <div className="title-block">
                <div className="initiative">
                    A SUSTAINABLE JERSEY CITY INITIATIVE
                </div>
                <div className="title">
                    Personal Trash Inventory (PTI)
                </div>
                <div className="description">
                    Helping People Minimize Their Personal Trash Footprint
                </div>
            </div>
            <div className="text-center">
                <div className="container">
                    <div className="row">
                        <div className='col-xs-4 col-md-3' style={{ margin: 'auto' }}>
                            <img className="about-img" src={about1} style={{ width: '14rem', margin: 'auto' }}/>
                            <div className="about-text-block">
                                <h3 className="about-text-number">1</h3>
                                <h3 className="about-text">set your goals</h3>
                            </div>
                        </div>
                        <div className='col-xs-4 col-md-3' style={{ margin: 'auto' }}>
                            <img className="about-img" src={about2} style={{ width: '14rem', margin: 'auto' }}/>
                            <div className="about-text-block">
                                <h3 className="about-text-number">2</h3>
                                <h3 className="about-text">track your trash</h3>
                            </div>
                        </div>
                        <div className='col-xs-4 col-md-3' style={{ margin: 'auto' }}>
                            <img className="about-img" src={about3} style={{ width: '14rem', margin: 'auto' }}/>
                            <div className="about-text-block">
                                <h3 className="about-text-number">3</h3>
                                <h3 className="about-text">view progress</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
