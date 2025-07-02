# PruebaNE Backend

## Cómo Ejecutar en Local
1. npm install
2. cp .env.example .env
3. Editar el archivo `.env` con tus configuraciones
4. npm run dev

## Casos de Uso
```gherkin
Feature: Consultar notas de transporte
  Como miembro de la empresa de transporte
  Quiero ver mis registros de recaudos, incidencias y mantenimientos
  Para conocer el historial de mis actividades

  Scenario: Ver lista de notas cuando existen registros
    Given que hay notas registradas
    When solicito la lista de notas
    Then recibo un estado 200
    And veo un listado con cada nota mostrando:
      | tipo         | título            | ruta               | monto (si aplica) | fecha         | hora    | descripción              |

  Scenario: Ver lista de notas cuando no hay registros
    Given que no hay notas registradas
    When solicito la lista de notas
    Then recibo un estado 200
    And veo un mensaje indicando "No hay notas registradas"

  Scenario: Ver resumen de estadísticas de notas
    Given que hay notas registradas
    When consulto el resumen de estadísticas
    Then recibo un estado 200
    And veo un resumen que muestra:
      | Total recaudado | <valor numérico> |
      | Incidencias     | <valor numérico> |
      | Total de notas  | <valor numérico> |

  Scenario: Crear nueva nota
    Given que tengo los datos de la nota:
      | tipo       | título               | ruta               | monto (si aplica) | descripción             |
      | recaudo    | Recaudo Ruta 15A     | Ruta 15A - Centro  | 50000             | Recaudo de la ruta      |
    When envío una petición POST a "/api/v1/notes"
    And el cuerpo incluye esos datos
    Then recibo un estado 201
    And la respuesta muestra la nota creada con un campo "id"
```
