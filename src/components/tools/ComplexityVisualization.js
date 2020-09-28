import React, { useRef, useState } from 'react';

// Loadable
import loadable from '@loadable/component';

// UI Components
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const D3 = loadable.lib(() => import('d3'));
const N_MAX = 50;

const FUNCTION_ENUM = {
  LOG: 1,
  SQUARE_ROOT: 2,
  N: 3,
  N_LOG: 4,
  N_SQUARED: 5,
  EXPONENTIAL: 6,
  FACTORIAL: 7
};

const FUNCTION_COLOR_MAP = new Map([
  [FUNCTION_ENUM.LOG, '#f44336'],
  [FUNCTION_ENUM.SQUARE_ROOT, '#f06292'],
  [FUNCTION_ENUM.N, '#2196f3'],
  [FUNCTION_ENUM.N_LOG, '#9c27b0'],
  [FUNCTION_ENUM.N_SQUARED, '#4caf50'],
  [FUNCTION_ENUM.EXPONENTIAL, '#ff9800'],
  [FUNCTION_ENUM.FACTORIAL, '#ffeb3b']
]);

const FUNCTION_NAME_MAP = new Map([
  [FUNCTION_ENUM.LOG, 'log(N)'],
  [FUNCTION_ENUM.SQUARE_ROOT, 'N^(1/2)'],
  [FUNCTION_ENUM.N, 'N'],
  [FUNCTION_ENUM.N_LOG, 'Nlog(N)'],
  [FUNCTION_ENUM.N_SQUARED, 'N^2'],
  [FUNCTION_ENUM.EXPONENTIAL, '2^N'],
  [FUNCTION_ENUM.FACTORIAL, '!N']
]);

const FUNCTION_MAP = new Map([
  [FUNCTION_ENUM.LOG, n => Math.log2(n || 1)],
  [FUNCTION_ENUM.SQUARE_ROOT, n => Math.sqrt(n)],
  [FUNCTION_ENUM.N, n => n],
  [FUNCTION_ENUM.N_LOG, n => n * Math.log2(n || 1)],
  [FUNCTION_ENUM.N_SQUARED, n => Math.pow(n, 2)],
  [FUNCTION_ENUM.EXPONENTIAL, n => Math.pow(2, Math.min(n, 10))],
  [FUNCTION_ENUM.FACTORIAL, n => factorial(Math.min(n, 7))]
]);

const factorial = n => {
  return (n > 1) ? n * factorial(n - 1) : 1;
}

const getSmallestDistance = (coords, functions, nChoice, yScale) => {
  let minDist = [null, Number.MAX_VALUE];
  for (const func of functions) {
    const dist = Math.abs(yScale(FUNCTION_MAP.get(func)(nChoice)) - coords[1]);
    if (dist < minDist[1])
      minDist = [func, dist];
  }
  return minDist[0];
}

const makeData = (showingSet, nValue) => {
  const data = [];
  for (const func of showingSet.values()) {
    const nextFuncData = [func, FUNCTION_NAME_MAP.get(func)]
    const calcFunc = FUNCTION_MAP.get(func);
    for (let i = 0; i < nValue; i += (nValue / N_MAX)) {
      nextFuncData.push({ y: calcFunc(i), x: i });
    }
    data.push(nextFuncData);
  }
  return data;
}

const ComplexityVisualization = () => {
  const graphRef = useRef(null);
  const [params, setParams] = useState({ showing: new Set([...Object.values(FUNCTION_ENUM)]), nValue: 20 });
  const [graphState, setGraphState] = useState({ init: false });
  const handleChange = (event, newValue) => {
    setParams({ ...params, nValue: newValue });
  };
  const handleCheckboxChange = e => {
    const clickedValue = Number(e.target.value);
    const newShowing = new Set([...params.showing]);
    if (newShowing.has(clickedValue))
      newShowing.delete(clickedValue);
    else 
      newShowing.add(clickedValue);
    setParams({...params, showing: newShowing});
  }
  return (
    <div style={{ maxWidth: '1230px', margin: 'auto', padding: '0 15px' }}>
      <div style={{ margin: '25px 0' }}>
        <Typography align='center' variant='h5' style={{ textDecoration: 'underline', textDecorationColor: '#f44336' }}>Runtime Complexity Visualization</Typography>
      </div>
      <Grid container spacing={0}>
        <Grid style={{ paddingRight: '16px' }} item xs={5} sm={5} md={4} lg={4} xl={4}>
          <Paper style={{ padding: '5px 12px', height: '100%' }}>
            <Typography style={{ margin: '15px 0 20px 0' }} align='center' variant='h6'>Set Parameters and Filter</Typography>
            <Typography align='center' variant='subtitle2'>Value of N</Typography>
            <Slider value={params.nValue} onChange={handleChange} min={1} max={50} marks={[{ value: 1, label: '1' }, { value: 25, label: '25' }, { value: 50, label: '50' }]} />
            <Typography style={{ marginTop: '25px'}} align='center' variant='subtitle2'>Filter</Typography>
            <div style={{ marginTop: '10px'}}>
              <FormControl component="fieldset">
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value={FUNCTION_ENUM.LOG}
                    control={<Checkbox
                      style={{color: FUNCTION_COLOR_MAP.get(FUNCTION_ENUM.LOG)}}
                      checked={params.showing.has(FUNCTION_ENUM.LOG)}
                      onChange={handleCheckboxChange} />}
                    label={<Typography>log(N)</Typography>}
                    labelPlacement='top'
                  />
                  <FormControlLabel
                    value={FUNCTION_ENUM.SQUARE_ROOT}
                    control={<Checkbox
                      style={{color: FUNCTION_COLOR_MAP.get(FUNCTION_ENUM.SQUARE_ROOT)}}
                      checked={params.showing.has(FUNCTION_ENUM.SQUARE_ROOT)}
                      onChange={handleCheckboxChange} />}
                    label={<Typography>&#8730;N</Typography>}
                    labelPlacement='top'
                  />
                  <FormControlLabel
                    value={FUNCTION_ENUM.N}
                    control={<Checkbox
                      style={{color: FUNCTION_COLOR_MAP.get(FUNCTION_ENUM.N)}}
                      checked={params.showing.has(FUNCTION_ENUM.N)}
                      onChange={handleCheckboxChange} />}
                    label={<Typography>N</Typography>}
                    labelPlacement='top'
                  />
                  <FormControlLabel
                    value={FUNCTION_ENUM.N_LOG}
                    control={<Checkbox
                      style={{color: FUNCTION_COLOR_MAP.get(FUNCTION_ENUM.N_LOG)}}
                      checked={params.showing.has(FUNCTION_ENUM.N_LOG)}
                      onChange={handleCheckboxChange} />}
                    label={<Typography>Nlog(N)</Typography>}
                    labelPlacement='top'
                  />
                  <FormControlLabel
                    value={FUNCTION_ENUM.N_SQUARED}
                    control={<Checkbox
                      style={{color: FUNCTION_COLOR_MAP.get(FUNCTION_ENUM.N_SQUARED)}}
                      checked={params.showing.has(FUNCTION_ENUM.N_SQUARED)}
                      onChange={handleCheckboxChange} />}
                    label={<Typography>N<sup>2</sup></Typography>}
                    labelPlacement='top'
                  />
                  <FormControlLabel
                    value={FUNCTION_ENUM.EXPONENTIAL}
                    control={<Checkbox
                      style={{color: FUNCTION_COLOR_MAP.get(FUNCTION_ENUM.EXPONENTIAL)}}
                      checked={params.showing.has(FUNCTION_ENUM.EXPONENTIAL)}
                      onChange={handleCheckboxChange} />}
                    label={<Typography>2<sup>N</sup></Typography>}
                    labelPlacement='top'
                  />
                  <FormControlLabel
                    value={FUNCTION_ENUM.FACTORIAL}
                    control={<Checkbox
                      style={{color: FUNCTION_COLOR_MAP.get(FUNCTION_ENUM.FACTORIAL)}}
                      checked={params.showing.has(FUNCTION_ENUM.FACTORIAL)}
                      onChange={handleCheckboxChange} />}
                    label={<Typography>!N</Typography>}
                    labelPlacement='top'
                  />
                  
                </FormGroup>
              </FormControl>
            </div>
          </Paper>
        </Grid>
        <Grid style={{ paddingLeft: '16px' }} item xs={7} sm={7} md={8} lg={8} xl={8}>
          <Paper style={{ padding: '18px 18px 5px 5px' }}>
            <div ref={graphRef}></div>
          </Paper>
        </Grid>
      </Grid>
      <D3>
        {
          d3 => {
            if (!graphState.init && graphRef.current) {
              const svg = d3.select(graphRef.current).append('svg').attr('width', '100%').attr('height', graphRef.current.clientWidth * 0.65);
              const pathGroup = svg.append('g').style('pointer-events', 'bounding-box').attr('width', Number(svg.style('width').replace('px', '')) - 65).attr('height', Number(svg.style('height').replace('px', '')) - 45).attr('transform', 'translate(55, 5)').style('cursor', 'crosshair');;
              const data = makeData(params.showing, params.nValue);

              const xScale = d3.scaleLinear()
                .domain([0, params.nValue])
                .range([0, pathGroup.attr('width')]);

              const yScale = d3.scaleLinear()
                .domain([0, Math.max(params.nValue, 4)])
                .range([pathGroup.attr('height'), 0]);

              const xAxis = d3.axisBottom()
                .scale(xScale);

              const yAxis = d3.axisLeft()
                .scale(yScale);

              const line = d3.line()
                .x(d => xScale(d.x))
                .y(d => yScale(d.y))

              for (const lineData of data) {
                pathGroup.append('path')
                  .datum(lineData.slice(2))
                  .attr('class', 'line')
                  .attr('stroke', FUNCTION_COLOR_MAP.get(lineData[0]))
                  .attr('stroke-width', 3)
                  .attr('d', line);
              }

              pathGroup.append('g').attr('class', 'x axis').attr('pointer-events', 'none').attr('transform', `translate(0, ${pathGroup.attr('height')})`).call(xAxis);
              pathGroup.append('g').attr('class', 'y axis').attr('pointer-events', 'none').attr('transform', `translate(0, 0)`).call(yAxis);
              svg.append('text').attr('class', 'text').attr('transform', `translate(${(graphRef.current.clientWidth / 2) + 17}, ${graphRef.current.clientWidth * 0.65})`).style('text-anchor', 'middle').text('N');
              svg.append('text').attr('class', 'text').attr('transform', 'rotate(-90)').attr('y', 0).attr('x', 0 - (graphRef.current.clientWidth * 0.65 / 2) + 23).attr('dy', '1em').style('text-anchor', 'middle').text('Time');

              pathGroup.on('mousemove', () => {
                const target = d3.event.target;
                const coords = d3.mouse(target);
                const nChoice = xScale.invert(coords[0]);
                const closestFunc = getSmallestDistance(coords, [...params.showing], nChoice, yScale);
                const time = FUNCTION_MAP.get(closestFunc)(nChoice);
                const mouseLine = d3.line()
                  .x(d => d.x)
                  .y(d => d.y);
                d3.selectAll('.indicator-line').remove();
                d3.selectAll('.indicator-circle').remove();
                d3.selectAll('.indicator-text').remove();
                pathGroup.append('path')
                  .datum([{ x: coords[0], y: 0 }, { x: coords[0], y: pathGroup.attr('height') }])
                  .attr('class', 'indicator-line')
                  .attr('d', mouseLine);
                pathGroup.append('circle')
                  .attr('class', 'indicator-circle')
                  .attr('cx', coords[0])
                  .attr('cy', yScale(time))
                  .attr('r', 5);
                pathGroup.append('text')
                .text(`${FUNCTION_NAME_MAP.get(closestFunc)}: ${time.toFixed(1)}`)
                .attr('class', 'indicator-text')
                .attr('x', coords[0] + 20)
                .attr('y', yScale(time) + 18);
              });

              setGraphState({ init: true, svg, xAxis, yAxis, line, pathGroup });
            } else if (graphRef.current) {
              const data = makeData(params.showing, params.nValue);

              const xScale = d3.scaleLinear()
                .domain([0, params.nValue])
                .range([0, graphState.pathGroup.attr('width')]);

              const yScale = d3.scaleLinear()
                .domain([0, Math.max(params.nValue, 4)])
                .range([graphState.pathGroup.attr('height'), 0]);

              d3.selectAll('.line').remove();

              const line = d3.line()
                .x(d => xScale(d.x))
                .y(d => yScale(d.y));

              for (const lineData of data) {
                graphState.pathGroup.append('path')
                  .datum(lineData.slice(2))
                  .attr('class', 'line')
                  .attr('stroke', FUNCTION_COLOR_MAP.get(lineData[0]))
                  .attr('stroke-width', 3)
                  .attr('d', line);
              }

              graphState.xAxis.scale(xScale);
              graphState.yAxis.scale(yScale);

              d3.selectAll('.axis').remove();
              graphState.pathGroup.append('g').attr('class', 'x axis').attr('pointer-events', 'none').attr('transform', `translate(0, ${graphState.pathGroup.attr('height')})`).call(graphState.xAxis);
              graphState.pathGroup.append('g').attr('class', 'y axis').attr('pointer-events', 'none').call(graphState.yAxis);

              graphState.pathGroup.on('mousemove', null);

              graphState.pathGroup.on('mousemove', () => {
                const target = d3.event.target;
                const coords = d3.mouse(target);
                let nChoice = xScale.invert(coords[0]);
                if (nChoice > params.nValue || nChoice < 0) {
                  d3.selectAll('.indicator-line').remove();
                  d3.selectAll('.indicator-circle').remove();
                  d3.selectAll('.indicator-text').remove();
                } else {
                  const closestFunc = getSmallestDistance(coords, [...params.showing], nChoice, yScale);
                  const time = FUNCTION_MAP.get(closestFunc)(nChoice);
                  const mouseLine = d3.line()
                    .x(d => d.x)
                    .y(d => d.y);
                  d3.selectAll('.indicator-line').remove();
                  d3.selectAll('.indicator-circle').remove();
                  d3.selectAll('.indicator-text').remove();
                  graphState.pathGroup.append('path')
                    .datum([{ x: coords[0], y: 0 }, { x: coords[0], y: graphState.pathGroup.attr('height') }])
                    .attr('class', 'indicator-line')
                    .attr('d', mouseLine);
                  graphState.pathGroup.append('circle')
                    .attr('class', 'indicator-circle')
                    .attr('cx', coords[0])
                    .attr('cy', yScale(time))
                    .attr('r', 5);
                  graphState.pathGroup.append('text')
                    .text(`${FUNCTION_NAME_MAP.get(closestFunc)}: ${time.toFixed(1)}`)
                    .attr('class', 'indicator-text')
                    .attr('x', coords[0] + 20)
                    .attr('y', yScale(time) + 18);
                  d3.selectAll('.axis').remove();
                  graphState.pathGroup.append('g').attr('class', 'x axis').attr('pointer-events', 'none').attr('transform', `translate(0, ${graphState.pathGroup.attr('height')})`).call(graphState.xAxis);
                  graphState.pathGroup.append('g').attr('class', 'y axis').attr('pointer-events', 'none').call(graphState.yAxis);
                }
              });
            }
            return null;
          }
        }
      </D3>
    </div>
  )
}

export default ComplexityVisualization;