
import Input from './components/Input';
import Button from './components/Button';
import { Container, Content, Row } from './styles';
import { useState } from 'react';
import { FaBackspace } from 'react-icons/fa';



const App = () => {
  const [currentNumber, setCurrentNumber] = useState('');
  const [firstNumber, setFirstNumber] = useState('');
  const [visorNumber, setVisorNumber] = useState('');
  const [operation, setOperation] = useState('');
  const [noConcat, setNoConcat] = useState(false)

  const handleOnClear = () => {
    setCurrentNumber('')
    setVisorNumber('')
    setFirstNumber('') 
  };

  const handleCancelEntry = () => {
    setCurrentNumber(firstNumber)
    setVisorNumber(firstNumber)
    setFirstNumber('')
  };

  const handleBackspace = () => {
    setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1))
    setVisorNumber(currentNumber.substring(0, currentNumber.length - 1))
  }

  const handleAddNumber = (num) => {
    if (noConcat){
      setCurrentNumber(prev => `${prev === '.' ? `0.${num}`: num}`)
      setVisorNumber(prev => `${prev === '.' ? `0.${num}`: num}`)
      setNoConcat(false)      
    } else {      
      setVisorNumber(prev => `${prev === '.' ? '0.' : prev}${num}`)
      setCurrentNumber(prev => `${prev === '.' ? '0.' : prev}${num}`)
    }
  }

 

  const handleSumNumbers = () => {
    setNoConcat(true)
    
    if (firstNumber === '') {
      setFirstNumber(String(currentNumber));
      setOperation('+')
    } else if (operation === "+") {
      const res = Number(firstNumber) + Number(currentNumber);
      setFirstNumber(String(res))
      setVisorNumber(String(res))
    } else {
      handleEquals()
      setOperation('+')
    }
    setCurrentNumber('')
  }

  const handleMinusNumbers = () => {
    setNoConcat(true)
    
    if (firstNumber === '') {
      setFirstNumber(String(currentNumber));
      setOperation('-')
    } else if (operation === "-") {
      const res = Number(firstNumber) - Number(currentNumber);
      setFirstNumber(String(res))
      setVisorNumber(String(res))
    } else {
      handleEquals()
      setOperation('-')
    }
    setCurrentNumber('')
  }

  const handleMultNumbers = () => {
    setNoConcat(true)
    if (firstNumber === '') {
      setFirstNumber(String(currentNumber));
      setOperation('*')
    } else if (operation === "*" ) {
      const res = Number(firstNumber) * Number(currentNumber);
      setFirstNumber(String(res))
      setVisorNumber(String(res))
    } else {
      handleEquals()
      setOperation('*')
    }
    setCurrentNumber('1')
  }

  const handleDivNumbers = () => {
    setNoConcat(true)
    if (firstNumber === '') {
      setFirstNumber(String(currentNumber));
      setOperation('/')
    } else if (operation === "/") {
      const res = Number(firstNumber) / Number(currentNumber);
      setFirstNumber(String(res))
      setVisorNumber(String(res))
    } else {
      handleEquals()
      setOperation('/')
    }
    setCurrentNumber('1')
  }

  const handleEquals = () => {

    if (operation !== '') {
      switch (operation) {
        case '+':
          handleSumNumbers();
          break;
        case '-':
          handleMinusNumbers();
          break;
        case '*':
          handleMultNumbers();
          break;
        case '/':
          handleDivNumbers();
          break;

        default:
          break;
      }      
    }
  }

  return (
    <Container>
      <Content>

        <Input value={visorNumber} />
        <Row>
          <Button label="CE" onClick={() => handleCancelEntry(firstNumber)} />
          <Button label="C" onClick={handleOnClear} />
          <Button label={<FaBackspace />} onClick={handleBackspace} />
          <Button label="x" onClick={handleMultNumbers} />
        </Row>
        <Row>
          <Button label="7" onClick={() => handleAddNumber('7')} />
          <Button label="8" onClick={() => handleAddNumber('8')} />
          <Button label="9" onClick={() => handleAddNumber('9')} />
          <Button label="/" onClick={handleDivNumbers}/>
        </Row>
        <Row>
          <Button label="4" onClick={() => handleAddNumber('4')} />
          <Button label="5" onClick={() => handleAddNumber('5')} />
          <Button label="6" onClick={() => handleAddNumber('6')} />
          <Button label="-" onClick={handleMinusNumbers} />
        </Row>
        <Row>
          <Button label="1" onClick={() => handleAddNumber('1')} />
          <Button label="2" onClick={() => handleAddNumber('2')} />
          <Button label="3" onClick={() => handleAddNumber('3')} />
          <Button label="+" onClick={handleSumNumbers} />
        </Row>
        <Row>
          <Button label="" onClick={() => handleAddNumber('')} />
          <Button label="0" onClick={() => handleAddNumber('0')} />
          <Button label="." onClick={() => handleAddNumber('.')} />
          <Button label="=" onClick={handleEquals} />
        </Row>
      </Content>
    </Container>
  );
}

export default App;
