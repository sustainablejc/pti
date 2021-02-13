import { useEffect, useState } from 'react';
import { Button, Card, CardDeck, Form, Row, Col, InputGroup } from 'react-bootstrap';

import axios from 'axios';


/**
 * Headers for materials. Should mimic the column structure
 */
export function MaterialHeader(props) {
    return (<div className="material-header">
        <Row>
            <Col xs="1" />
            <Col xs="3">
                <h5>add a material</h5>
            </Col>
            <Col xs="3">
                <h5>add an amount</h5>
            </Col>
        </Row>
    </div>);
}


/**
 * An individual material row
 */
export function Material(props) {
    const materialOptions = [
        {'id': 1, 'name': 'Glass', 'description': 'This is glass'},
        {'id': 2, 'name': 'Plastic 1', 'description': 'This is plastic'},
        {'id': 3, 'name': 'Plastic 2', 'description': 'This is plastic'},
        {'id': 4, 'name': 'Plastic Other', 'description': 'This is plastic'},
        {'id': 5, 'name': 'Cardboard', 'description': 'This is cardboard'},
        {'id': 6, 'name': 'Trash', 'description': 'This is trash'},
    ];

    const { add, index, handleChange, name, remove, values, isLast } = props;
    const material = values[index];

    return (<div className="material">
        <Form.Group as={Row}>
            <Col xs="1">
                {isLast ? <button className="btn-circle btn-secondary" onClick={() => add()}>+</button> : ''}
            </Col>
            <Col xs="3">
                <Form.Control
                        className="material-select"
                        as="select"
                        name={`${name}.materialId`}
                        value={material.materialId}
                        onChange={handleChange}>
                    <option value="0">select...</option>
                    {materialOptions.map((m, index) => {
                        return (<option value={m.id} key={index}>{m.name}</option>);
                    })}
                </Form.Control>
            </Col>
            <Col xs="3">
                <InputGroup className="mb-1">
                    <Form.Control
                        name={`${name}.weight`}
                        type="number"
                        value={material.weight}
                        onChange={handleChange} />
                    <InputGroup.Append>
                        <InputGroup.Text>lb.</InputGroup.Text>
                    </InputGroup.Append>
                    <h4 style={{paddingLeft: '1rem', paddingRight: '1rem'}}> / </h4>
                    <Form.Control
                        name={`${name}.quantity`}
                        type="number"
                        value={material.quantity}
                        onChange={handleChange} />
                    <InputGroup.Append>
                        <InputGroup.Text>qty</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
            </Col>
            <Col xs="1">
            {index == 0
                ? ''
                : <button className="btn-circle btn-danger" onClick={() => remove(index)}>-</button>}
            </Col>
        </Form.Group>
    </div>);
}


function NewMaterialCard(props) {
    const materials = [
        {'id': 1, 'name': 'Glass', 'description': 'This is glass'},
        {'id': 2, 'name': 'Plastic 1', 'description': 'This is plastic'},
        {'id': 3, 'name': 'Plastic 2', 'description': 'This is plastic'},
        {'id': 4, 'name': 'Plastic Other', 'description': 'This is plastic'},
        {'id': 5, 'name': 'Cardboard', 'description': 'This is cardboard'},
        {'id': 6, 'name': 'Trash', 'description': 'This is trash'},
    ];

    const [materialId, setMaterialId] = useState(0);
    const [amount, setAmount] = useState(0);

    const saveMaterial = () => {
        const material = materials.filter(x => x.id == materialId)[0];
        setMaterialId(0);
        setAmount(0);
        props.addMaterial(materialId, amount, material);
    }

    return (<Card style={{ flex: '0 0 350px' }}>
        <Card.Body>
            <Card.Title>Add a material</Card.Title>
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column className="label"><b>Material</b></Form.Label>
                    <Col>
                        <Form.Control
                            as="select"
                            onChange={(e) => setMaterialId(e.target.value)}
                            value={materialId}>
                        <option value="0">Please select...</option>
                        {materials.map((m, index) => {
                            return (<option value={m.id} key={index}>{m.name}</option>);
                        })}
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column className="label"><b>Amount (in lbs)</b></Form.Label>
                    <Col>
                        <Form.Control
                            type="text"
                            onChange={(e) => setAmount(e.target.value)}
                            value={amount}>
                        </Form.Control>
                    </Col>
                </Form.Group>
            </Form>
        </Card.Body>
        <Card.Footer>
        <Button
            onClick={saveMaterial}
            style={{"margin-right": "15px"}}>Save</Button>
        <Button onClick={props.handleFormClose}>Cancel</Button>
        </Card.Footer>
    </Card>);
}
