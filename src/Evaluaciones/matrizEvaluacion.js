import React from 'react'

export default function MatrizEvaluacion({ skills, wills }) {
  function isThisSquare(skillsLocation, willsLocation) {
    if (skillsLocation === willsLocation) {
      return true
    }
  }

  return (
    <div style={styles.container}>
      <h1>Matriz de evaluación</h1>
      <div style={styles.column}>
        <div style={styles.row}>
          <div
            style={{
              ...styles.square,
              backgroundColor: skills < 2 && wills > 1 ? 'yellow' : 'white'
            }}
          >
            Entrenar
          </div>
          <div
            style={{
              ...styles.square,
              backgroundColor: skills > 1 && wills > 1 ? 'green' : 'white',
              color: skills > 1 && wills > 1 ? 'white' : 'black'
            }}
          >
            Onboarding
          </div>
        </div>
        <div style={styles.row}>
          <div
            style={{
              ...styles.square,
              backgroundColor: skills < 2 && wills < 2 ? 'red' : 'white',
              color: skills < 2 && wills < 2 ? 'white' : 'black'
            }}
          >
            Desvincular
          </div>
          <div
            style={{
              ...styles.square,
              backgroundColor: skills > 1 && wills < 2 ? 'yellow' : 'white'
            }}
          >
            Dar acompañamiento
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '10px'
  },
  square: {
    width: '200px',
    height: '200px',
    border: '1px solid black'
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  }
}
