import React from 'react';
import loadable from '@loadable/component';
import Loading from './Loading';

export const Tools = loadable(() => import('./components/tools/Tools'), {
  fallback: <Loading />
});

export const ComplexityVisualization = loadable(() => import('./components/tools/ComplexityVisualization'), {
  fallback: <Loading />
});