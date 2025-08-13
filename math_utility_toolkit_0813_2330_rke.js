// 代码生成时间: 2025-08-13 23:30:12
// Importing necessary modules
const { NextResponse } = require('next/server');

// MathUtility class
class MathUtility {
  // Adds two numbers
  add(a, b) {
    return a + b;
  }

  // Subtracts two numbers
  subtract(a, b) {
    return a - b;
  }

  // Multiplies two numbers
  multiply(a, b) {
    return a * b;
  }

  // Divides two numbers
  divide(a, b) {
    if (b === 0) {
      throw new Error('Cannot divide by zero.');
    }
    return a / b;
  }

  // Calculates the power of a number
  power(base, exponent) {
    return Math.pow(base, exponent);
  }
}

// Exporting the MathUtility class
module.exports = MathUtility;

// Example usage in a Next.js API route
// pages/api/math.js
const MathUtility = require('./math_utility_toolkit.js');

export default function handler(req) {
  const mathUtils = new MathUtility();

  switch (req.nextUrl.searchParams.get('operation')) {
    case 'add':
      return new NextResponse(
        JSON.stringify({
          result: mathUtils.add(Number(req.nextUrl.searchParams.get('a')), Number(req.nextUrl.searchParams.get('b')))
        })
      );
    case 'subtract':
      return new NextResponse(
        JSON.stringify({
          result: mathUtils.subtract(Number(req.nextUrl.searchParams.get('a')), Number(req.nextUrl.searchParams.get('b')))
        })
      );
    case 'multiply':
      return new NextResponse(
        JSON.stringify({
          result: mathUtils.multiply(Number(req.nextUrl.searchParams.get('a')), Number(req.nextUrl.searchParams.get('b')))
        })
      );
    case 'divide':
      try {
        return new NextResponse(
          JSON.stringify({
            result: mathUtils.divide(Number(req.nextUrl.searchParams.get('a')), Number(req.nextUrl.searchParams.get('b')))
          })
        );
      } catch (error) {
        return new NextResponse(
          JSON.stringify({
            error: error.message
          }),
          { status: 400 } // Bad Request
        );
      }
    case 'power':
      return new NextResponse(
        JSON.stringify({
          result: mathUtils.power(Number(req.nextUrl.searchParams.get('a')), Number(req.nextUrl.searchParams.get('b')))
        })
      );
    default:
      return new NextResponse(
        JSON.stringify({
          error: 'Unsupported operation.'
        }),
        { status: 400 } // Bad Request
      );
  }
}
