import React from 'react';

export default function geterror(error) {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
}
