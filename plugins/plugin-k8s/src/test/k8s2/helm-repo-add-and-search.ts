/*
 * Copyright 2019 IBM Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as common from '@kui-shell/core/tests/lib/common'
import { cli } from '@kui-shell/core/tests/lib/ui'

const synonyms = ['helm']

// TODO: enable this test when ISSUE https://github.com/IBM/kui/issues/1947 is solved
common.localDescribe('helm repo add and search', function(this: common.ISuite) {
  before(common.before(this))
  after(common.after(this))

  synonyms.forEach(helm => {
    const addRepo = () => {
      it('should add a helm repo', () => {
        return cli
          .do(`${helm} repo add bitnami https://charts.bitnami.com/bitnami`, this.app)
          .then(cli.expectOKWithAny)
          .catch(common.oops(this))
      })
    }

    const searchRepo = (desiredImage: string) => {
      it(`should search for ${desiredImage}`, () => {
        return cli
          .do(`${helm} search ${desiredImage}`, this.app)
          .then(cli.expectOKWith(desiredImage))
          .catch(common.oops(this))
      })
    }

    const deleteRepo = () => {
      it('should remove a helm repo', () => {
        return cli
          .do(`${helm} repo remove bitnami`, this.app)
          .then(cli.expectOKWithAny)
          .catch(common.oops(this))
      })
    }

    addRepo()
    searchRepo('nginx')
    deleteRepo()
  })
})
