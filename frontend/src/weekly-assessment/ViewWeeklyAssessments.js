import { useEffect, useState } from 'react';
import axios from 'axios';

import { Button, Form, Row, Col } from 'react-bootstrap';
import ReactTable from '../common/ReactTable';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';


/*
 * https://stackoverflow.com/questions/5210376/how-to-get-first-and-last-day-of-the-current-week-in-javascript/44392420#44392420
 */
function firstDayOfWeek(datetime) {
    let date = new Date(datetime.toDateString());
    var first = date.getDate() - date.getDay();
    return new Date(date.setDate(first));
}


export function ViewWeeklyAssessments() {

    const [assessments, setAssessments] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/v1/weekly-assessment/`)
            .then(res => {
                setAssessments(res.data);
            }).catch(err => {
                setAssessments([]);
            });
    }, []);

    const materials = assessments
        .flatMap(x => x.weeklyMaterials.map(m => {
            return {...m, date: x.date, name: m.material.name}
            })
        );

    const columns = [
        {
            Header: 'Date',
            accessor: x => new Date(x.date).toDateString(),

        }, {
            Header: 'Material',
            accessor: 'name'
        }, {
            Header: 'Amount (in lbs)',
            accessor: 'amount'
        }
    ];

    return (<div className="thing">
        <h3 className="header-block">VIEW YOUR PROGRESS</h3>
        <div className="container">
            <WeeklyAssessmentsChart materials={materials} />
            <div className="view-table">
                <ReactTable columns={columns} data={materials} />
            </div>
        </div>
    </div>);
}


function WeeklyAssessmentsChart(props) {

    const materials = props.materials.map(x => {
        const date = new Date(x.date);
        return {...x, firstDayOfWeek: firstDayOfWeek(new Date(x.date))}
    }
    // group by the firstDayOfWeek, and add a point for each material
    ).reduce((dict, item) => {
        let firstDayOfWeek = item.firstDayOfWeek.toDateString();
        dict[firstDayOfWeek] = dict[firstDayOfWeek] || {firstDayOfWeek: firstDayOfWeek};
        dict[firstDayOfWeek][item.material.name] = item.amount;
        return dict;
    }, {});

    var data = Object.values(materials);

    if (data.length == 0) {
        return '';
    }

    // FIXME generate a new line for each unique material type
    return (
    <div className="chart container">
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={data}
                margin={{
                top: 5, right: 5, left: 5, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="firstDayOfWeek" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="glass" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="plastic" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    </div>);
}

