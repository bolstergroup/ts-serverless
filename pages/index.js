import React from 'react';
import '../static/scss/main.scss';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { STATIC_PATH } = publicRuntimeConfig;

export default () => (
  <div className="index">
    <h1>Hello World</h1>
  </div>
);
