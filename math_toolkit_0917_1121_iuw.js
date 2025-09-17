// 代码生成时间: 2025-09-17 11:21:01
 * Features:
 * - Addition
 * - Subtraction
 * - Multiplication
 * - Division
 * - Power
 * - Square Root
 *
 * @author Your Name
 * @version 1.0.0
 * @license MIT
 */

// Next.js server-side function to handle math operations
export async function mathOperations(req, res) {
    try {
        const { operation, num1, num2 } = req.body;

        // Validate the request body
        if (!operation || !num1 || !num2) {
            return res.status(400).json({ error: 'Missing parameters' });
        }

        let result;

        switch (operation) {
            case 'add':
                result = add(num1, num2);
                break;
            case 'subtract':
                result = subtract(num1, num2);
                break;
            case 'multiply':
                result = multiply(num1, num2);
                break;
            case 'divide':
                result = divide(num1, num2);
                break;
            case 'power':
                result = power(num1, num2);
                break;
            case 'sqrt':
                result = sqrt(num1);
                break;
            default:
                return res.status(400).json({ error: 'Invalid operation' });
        }

        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Math operation functions

// Adds two numbers
function add(num1, num2) {
    return num1 + num2;
}

// Subtracts num2 from num1
function subtract(num1, num2) {
    return num1 - num2;
}

// Multiplies two numbers
function multiply(num1, num2) {
    return num1 * num2;
}

// Divides num1 by num2, ensuring num2 is not zero
function divide(num1, num2) {
    if (num2 === 0) {
        throw new Error('Cannot divide by zero');
    }
    return num1 / num2;
}

// Raises num1 to the power of num2
function power(num1, num2) {
    return Math.pow(num1, num2);
}

// Calculates the square root of a number
function sqrt(num) {
    if (num < 0) {
        throw new Error('Cannot calculate square root of a negative number');
    }
    return Math.sqrt(num);
}
