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
 * Describes the result of an operation that created or updated a repair task.
 *
 * This type supports the Service Fabric platform; it is not meant to be used
 * directly from your code.
 *
 *
 */
class RepairTaskUpdateInfo {
  /**
   * Create a RepairTaskUpdateInfo.
   * @member {string} version The new version of the repair task.
   */
  constructor() {
  }

  /**
   * Defines the metadata of RepairTaskUpdateInfo
   *
   * @returns {object} metadata of RepairTaskUpdateInfo
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'RepairTaskUpdateInfo',
      type: {
        name: 'Composite',
        className: 'RepairTaskUpdateInfo',
        modelProperties: {
          version: {
            required: true,
            serializedName: 'Version',
            type: {
              name: 'String'
            }
          }
        }
      }
    };
  }
}

module.exports = RepairTaskUpdateInfo;