/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

'use strict';

const models = require('./index');

/**
 * The Dynamics entity dataset.
 *
 * @extends models['Dataset']
 */
class DynamicsEntityDataset extends models['Dataset'] {
  /**
   * Create a DynamicsEntityDataset.
   * @member {object} [entityName] The logical name of the entity. Type: string
   * (or Expression with resultType string).
   */
  constructor() {
    super();
  }

  /**
   * Defines the metadata of DynamicsEntityDataset
   *
   * @returns {object} metadata of DynamicsEntityDataset
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'DynamicsEntity',
      type: {
        name: 'Composite',
        className: 'DynamicsEntityDataset',
        modelProperties: {
          description: {
            required: false,
            serializedName: 'description',
            type: {
              name: 'String'
            }
          },
          structure: {
            required: false,
            serializedName: 'structure',
            type: {
              name: 'Object'
            }
          },
          linkedServiceName: {
            required: true,
            serializedName: 'linkedServiceName',
            defaultValue: {},
            type: {
              name: 'Composite',
              className: 'LinkedServiceReference'
            }
          },
          parameters: {
            required: false,
            serializedName: 'parameters',
            type: {
              name: 'Dictionary',
              value: {
                  required: false,
                  serializedName: 'ParameterSpecificationElementType',
                  type: {
                    name: 'Composite',
                    className: 'ParameterSpecification'
                  }
              }
            }
          },
          type: {
            required: true,
            serializedName: 'type',
            type: {
              name: 'String'
            }
          },
          entityName: {
            required: false,
            serializedName: 'typeProperties.entityName',
            type: {
              name: 'Object'
            }
          }
        }
      }
    };
  }
}

module.exports = DynamicsEntityDataset;