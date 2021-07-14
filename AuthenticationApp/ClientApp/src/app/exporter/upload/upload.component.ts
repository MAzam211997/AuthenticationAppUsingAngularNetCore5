import { HttpEventType } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProgressStatus, ProgressStatusEnum } from 'src/app/shared/models/progress-status.model';
import { UploadDownloadService } from 'src/app/shared/services/upload-download.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @Input() public disabled: boolean;
  @Output() public uploadStatus: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile', {static:false}) inputFile: ElementRef;
  constructor(private service: UploadDownloadService,private toastr: ToastrService) {
    this.uploadStatus = new EventEmitter<ProgressStatus>();
  }
  ngOnInit() {
  }

  public ulopadFile(event)
  {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.service.uploadFile(file).subscribe(
        data => {
        },
        error => {
          this.uploadStatus.emit({status: ProgressStatusEnum.ERROR});
        }
      );
    }
  }

  public upload(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadStatus.emit({status: ProgressStatusEnum.START});
      this.service.uploadFile(file).subscribe(
        data => {
          if (data) {
            switch (data.type) {
              case HttpEventType.UploadProgress:
                this.uploadStatus.emit( {status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100)});
                break;
              case HttpEventType.Response:
                this.inputFile.nativeElement.value = '';
                this.uploadStatus.emit( {status: ProgressStatusEnum.COMPLETE});
                break;
            }
            this.toastr.success('File has been uploaded successfully.', 'Upload Successful !');
          }
        },
        error => {
          this.inputFile.nativeElement.value = '';
          this.uploadStatus.emit({status: ProgressStatusEnum.ERROR});
        }
      );
    }
  }

}
