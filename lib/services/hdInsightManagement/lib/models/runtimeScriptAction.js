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

/**
 * Describes a script action on a running cluster.
 *
 */
class RuntimeScriptAction {
  /**
   * Create a RuntimeScriptAction.
   * @member {string} name The name of the script action.
   * @member {string} uri The URI to the script.
   * @member {string} [parameters] The parameters for the script
   * @member {array} roles The list of roles where script will be executed.
   * @member {string} [applicationName] The application name of the script
   * action, if any.
   */
  constructor() {
  }

  /**
   * Defines the metadata of RuntimeScriptAction
   *
   * @returns {object} metadata of RuntimeScriptAction
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'RuntimeScriptAction',
      type: {
        name: 'Composite',
        className: 'RuntimeScriptAction',
        modelProperties: {
          name: {
            required: true,
            serializedName: 'name',
            type: {
              name: 'String'
            }
          },
          uri: {
            required: true,
            serializedName: 'uri',
            type: {
              name: 'String'
            }
          },
          parameters: {
            required: false,
            serializedName: 'parameters',
            type: {
              name: 'String'
            }
          },
          roles: {
            required: true,
            serializedName: 'roles',
            type: {
              name: 'Sequence',
              element: {
                  required: false,
                  serializedName: 'StringElementType',
                  type: {
                    name: 'String'
                  }
              }
            }
          },
          applicationName: {
            required: false,
            readOnly: true,
            serializedName: 'applicationName',
            type: {
              name: 'String'
            }
          }
        }
      }
    };
  }
}

module.exports = RuntimeScriptAction;