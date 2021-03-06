/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { TestBed } from '@angular/core/testing';
import { APP_CONFIG, METRON_REST_CONFIG } from '../app.config';
import { HdfsService } from './hdfs.service';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';

describe('HdfsService', () => {
  let hdfsService: HdfsService;
  let mockBackend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HdfsService,
        { provide: APP_CONFIG, useValue: METRON_REST_CONFIG }
      ]
    });
    hdfsService = TestBed.get(HdfsService);
    mockBackend = TestBed.get(HttpTestingController);
  });

  describe('when service functions', () => {
    let fileList = ['file1', 'file2'];
    let contents = 'file contents';

    it('list', () => {
        hdfsService.list('/path').subscribe(
          result => {
            expect(result).toEqual(fileList);
          },
          error => console.log(error)
        );
        const req = mockBackend.expectOne('/api/v1/hdfs/list?path=/path');
        expect(req.request.method).toBe('GET');
        req.flush(fileList);
      });

    it('read', () => {
        hdfsService.read('/path').subscribe(
          result => {
            expect(result).toEqual(contents);
          },
          error => console.log(error)
        );
        const req = mockBackend.expectOne('/api/v1/hdfs?path=/path');
        expect(req.request.method).toBe('GET');
        req.flush(contents);
      });

    it('post', () => {
        hdfsService.post('/path', contents).subscribe(
          result => {
            expect(result.status).toEqual(200);
          },
          error => console.log(error)
        );
        const req = mockBackend.expectOne('/api/v1/hdfs?path=/path');
        expect(req.request.method).toBe('POST');
        req.flush({ status: 200 });
      });

    it('deleteFile', () => {
        hdfsService.deleteFile('/path').subscribe(
          result => {
            expect(result.status).toEqual(200);
          },
          error => console.log(error)
        );
        const req = mockBackend.expectOne('/api/v1/hdfs?path=/path');
        expect(req.request.method).toBe('DELETE');
        req.flush({ status: 200 });
      });
  });
});
