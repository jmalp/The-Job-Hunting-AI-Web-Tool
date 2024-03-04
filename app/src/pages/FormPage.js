import '../App.css';
import { MultiStepProgressBar } from "../components/MultiStepProgress";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useState } from "react";
import { MultiStepForm } from "../components/MultiStepForm";
import { questions } from "../Questions";

function FormPage() {
  const [index, setIndex] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const totalPagesCount = questions?.length || 0;
  const [pagesAnswers, setPagesAnswers] = useState({});

  const prevButton = () => {
    if (index > 1) {
      setIndex(prevIndex => prevIndex - 1);
    }
  }

  const nextButton = () => {
    if (index - 3) {
      setIndex(prevIndex => prevIndex + 1);
    } else {
      // clear the form on submit
      setPagesAnswers({});
      setSubmitted(true);
    }
  }

  const onPageAnswerUpdate = (step, answersObj) => {
    setPagesAnswers({...pagesAnswers, [step]: answersObj});
  }

  const handleStart = () => {
    setIndex(1);
    setSubmitted(false);
  }

  return (
    <div className="App">
      <Container className="h-100">
        <Row className="m-5">
          <Col className="align-self-center">
            <MultiStepProgressBar
              step={index}
              />
          </Col>
        </Row>
        <Row>
          {
            submitted ?
            <Card>
              <Card.Body>
                <p>Form Submitted.</p>
              </Card.Body>
              <Card.Footer>
                <Button className={"custom-submit-btn"} onClick={handleStart}>Continue to Account</Button>
              </Card.Footer>
            </Card> :
          <Card>
            <Card.Body>
            <p>Tell us more about yourself to receive more accurate results</p>
              <MultiStepForm
                list={questions}
                step={index}
                onPageUpdate={onPageAnswerUpdate}
                pagesAnswers={pagesAnswers}
                />
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between">
              <Button
                onClick={prevButton}
                disabled={index === 1}
                className="submit"
              >
                Previous
              </Button>
              <Button
                onClick={nextButton}
                className="submit"
              >
                {index === totalPagesCount ? 'Submit' : 'Next'}
              </Button>
            </Card.Footer>
          </Card>
        }
        </Row>
      </Container>
    </div>
  );
}

export default FormPage;