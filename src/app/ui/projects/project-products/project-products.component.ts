import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/core/products.service';

declare var $: any;
declare let jsPDF;

@Component({
  selector: 'project-products',
  templateUrl: './project-products.component.html',
  styleUrls: ['./project-products.component.scss']
})
export class ProjectProductsComponent implements OnInit {

  id: any;
  productProject: any;
  success: Boolean;
  message: any;

  options = {
    fieldSeparator: ',',
    quoteStrings: '',
    decimalseparator: '.',
    showLabels: true,
    showTitle: false,
    title: 'asfasf',
    useBom: false,
    removeNewLines: true,
    headers: [
      'productCode',
      'productTitle',
      'productDescription',
      'productPrice',
      'categories',
      'parentProduct',
      'dateCreated',
      'createdBy',
      'description',
      'width',
      'height',
      'depth',
      'leverLength',
      'weightBearing',
      'wasteLocation',
      'plugAndWaste',
      'overflow',
      'seatColour',
      'sTrap',
      'pTrap',
      'flushPlate',
      'welsRating',
      'litresPerMinute',
      'materials',
      'lockable',
      'cartridge',
      'cartridgeSize',
      'runTime',
      'inletValve',
      'outletValve',
      'outlet',
      'MixedTemp',
      'inletTemperatureHot',
      'inletTemperatureCold',
      'maxInletPressure',
      'workingPressures',
      'maxWorkingTemp',
      'seat',
      'colourFinish',
      'servicing',
      'solutions',
      'warranty',
      'feautures',
      'flowRate',
      'fireResistanceLevel',
      'patentNumber',
      // 'secondaryImageURLS',
      'technicalSheetURL',
      'DWGFileURL',
      'revitFileURL',
      // 'imageURL',
    ],
    keys: [
      'productCode',
      'productTitle',
      'productDescription',
      'productPrice',
      'categoriesCode',
      'parentProduct',
      'dateCreated',
      'createdBy',
      'description',
      'width',
      'height',
      'depth',
      'leverLength',
      'weightBearing',
      'wasteLocation',
      'plugAndWaste',
      'overflow',
      'seatColour',
      'sTrap',
      'pTrap',
      'flushPlate',
      'welsRating',
      'litresPerMinute',
      'materials',
      'lockable',
      'cartridge',
      'cartridgeSize',
      'runTime',
      'inletValve',
      'outletValve',
      'outlet',
      'MixedTemp',
      'inletTemperatureHot',
      'inletTemperatureCold',
      'maxInletPressure',
      'workingPressures',
      'maxWorkingTemp',
      'seat',
      'colourFinish',
      'servicing',
      'solutionsCode',
      'warranty',
      'feautures',
      'flowRate',
      'fireResistanceLevel',
      'patentNumber',
      // 'secondaryImageURLS',
      'technicalSheetURL',
      'DWGFileURL',
      'revitFileURL',
      // 'imageURL'
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    console.log(this.id)
    this.getAllProjects();
  }

  getAllProjects() {
    this.productsService.getSelectedProjectProducts(this.id.split('.')[1]).subscribe((productProject) => {
      this.productProject = productProject;
      console.log(this.productProject)
    });
  }

  removeToProject(product) {
    this.productsService.deleteToProject(product.id).then(() => {
      this.success = true;
      this.message = `'${product.productTitle}' was removed from your '${this.id.split('.')[0]}' project`;
    })
  }

  downloadFile() {
    $('#exportFile').click();
  }

  downloadPDF() {
    let doc = new jsPDF('p', 'pt');
    let headerImgData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABX8AAAHdCAIAAADKK51XAAAACXBIWXMAABcSAAAXEgFnn9JSAAAFGmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjE5MDQtMDEtMDFUMTE6MDArMTE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE5LTAxLTA0VDE4OjI0OjAyKzExOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTAxLTA0VDE4OjI0OjAyKzExOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjIwZjUwNzEzLWIzOWYtNDJjOC1hNTA2LWEzODkxMzBmY2Q5MSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMGY1MDcxMy1iMzlmLTQyYzgtYTUwNi1hMzg5MTMwZmNkOTEiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyMGY1MDcxMy1iMzlmLTQyYzgtYTUwNi1hMzg5MTMwZmNkOTEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjIwZjUwNzEzLWIzOWYtNDJjOC1hNTA2LWEzODkxMzBmY2Q5MSIgc3RFdnQ6d2hlbj0iMTkwNC0wMS0wMVQxMTowMCsxMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Qd8ZrQAAQYFJREFUeNrt3X+QlfWd4PvewmIyTB9DRctAAyPW2gLibK3smmD2FlbhikR3x/gjovcuxBJIzWXKyI/MiBCCbQeEvYFuY4W6FWnLNH9oiz8wEwxgNbV07YRembSpjTQt7RQkdNPEkrlMd8ckltbcxz5JF4MC/eN8n/P8eL0qZamB03LO6e/zOe9+nu/zb/7lX/6lAgAAACCYf6M+AAAAAEGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6kMunH7/WMvxJz/48Ddzrnp4YuE6TwgAAABxUh8y7oOPftN28rnDv/67wX9z5fgvzrnq4bFj/syTAwAAQDzUhyzr6Xur5diT/R+8e86/Hztm3JyrHr5y/GxPEQAAADFQH7Lpg49+03LsyV+e+V8X+DVOggAAACAe6kMGHf71j9pOPvfBR+9f9Fc6CQIAAIAYqA+Z0v/7dw8cf/JU31vD+l1OggAAACAo9SE72k4+9+bJ50f2e8eOGTd7ypLqy2/2NAIAAFBy6kMW9PS91Xpi+z+9f2yUjzOhcN1NUx+u/JMrPKUAAACUkPqQbp+8oeYojR0zblbV/TM//5eeWwAAAEpFfUixX55pbTn25FB2lxwuJ0EAAABQQupDKvX//t3WE9svfEPNUXISBAAAAKWiPqTP0G+oOXpOggAAAGD01Ic0Of3+sdYT24d7Q81RGjtm3MzP/+Wsqvs9/wAAAIyM+pAao7mh5uh9btxVc6Y+fNm4q7wQAAAADJf6kAI9fW+1HHuy/4N3y/5fcn3VfU6CAAAAYLjUh0T74KPftP5qe+fp/cn5T3ISBAAAAMOlPiRXuBtqjp6TIAAAABg69SGJ+n//7oHjT8a8u+RwfW7cVbOnLJlYuM7rBQAAwIWpD4kT5w01R2/m5//rrKr7x475My8cAAAA56M+JMjp94+1HH/yn94/lq7/7MqxV8y56mEnQQAAAHA+6kMifPDRb9pOPnf413+X3j+CkyAAAAA4H/Wh/JJzQ81RchIEAAAAn0p9KKcPPvpNy7Enf3nmf2XpD+UkCAAAAM6hPpRN53vNrSe2p2V3yWGpHHvF7D9ffOX42V5lAAAAKtSHskjFDTVH78rxX5xz1cNOggAAAEB9iFvbyefePPl8oAevHHtF9NfhbiExoXBdoBQydsy4OVc97CQIAACAnFMf4tPT91brie3hbqhZ3HDh9Xc2Djcl3DZtQ/TXcP9tToIAAADIOfUhDqFvqHn2zSZ2v712BPWh+HsH/iN/FGIrCidBAAAA5Jn6ENwvz7S2/qoh3A01r6+6b1bV/YP/OJr6UBF4T4orx39x9pQllX9yhXcFAABArqgPAUWf5FtPbA93Q80JhetumvrwOR/mR1kfisLdj2PsmHGzqu6f+fm/9PYAAADID/UhlKA31LzAZ/iS1IeKgatFWn+1vfP0/hD//Z/aTQAAAMgq9SGInr63Xnt7baAHv/AmjqWqD4N/kJZjT4a4bGTsmHGzpyypvvxm7xYAAIDMUx+CaPrfS0N8Yq8ce8XsP1984b0bS1sfKgZOgnjr1z8KdJfQBX/xtDMgAAAAMk99KL3T7x/b1b685A9bvKHmRe9bWfL6MPiHaj2xveS7UUZ/qNlTlnjPAAAAZJv6UHptJ58r7ZkCnxt31ZypD1827qqh/OJA9aHo8K9/FP3pSriZxYTCdbdP2+A9AwAAkG3qQ+mVsD6M4A4RQetDxcCFGC3HnizhjTwW/8dXvWcAAACyTX0ovVLVhyvHf3H2lCXD3RYhdH0o+uWZ1tZfNZRkbwv1AQAAIPPUh9LrfK+55fj3RvMIQ9ld8nziqQ8VAydBtJ187vCv/240f9KxY8YtvP457xkAAIBsUx9KL/pYvuPN/3PEv32Iu0ueT2z1oej0+8dajj/5T+8fG9lvv3L8F//z1Wu8ZwAAALJNfQii5diTnaf3D/d3DWt3yfOJuT4UDZwE8aMR7EY5Z+o3qi+/2RsGAAAg29SHIPp//27TL5YO/dePYHfJ8ylLfSj+kQ8cf3JYX7py7BUL/t3T3i0AAACZpz6E0npi+xD3RKi+bO7sP18y4kstzlGu+lD0yzOtLceeHMpJEGPHjLtt2sZRnugBAABAKqgPAb3SvvzCGyJ8btxVs6csKdUn/6Ly1oeKgW0vWn+1/cIXnkgPAAAAuaI+BBR9Dt/99tpPDRCVY6+YVXVfiC0Pyl4fii5wS87qy+bOqrp/uHcSBQAAIL3Uh7A+eSLAhMJ111w2N9xWiwmpD0W/PNPa0/fW6YH+Uhh7xWXjrrpy/GzdAQAAIG/Uh5j0DBSB6ON3qfZ3OJ9E1QcAAACoUB+yR30AAAAgadSHrFEfAAAASBr1IWvUBwAAAJJGfcga9QEAAICkUR+yRn0AAAAgadSHrFEfAAAASBr1IWvUBwAAAJJGfcga9QEAAICkUR+yRn0AAAAgadSHrFEfAAAASBr1IWvUBwAAAJJGfcga9QEAAICkUR+yRn0AAAAgadSHrFEfAAAASBr1IWvUBwAAAJJGfcga9QEAAICkUR+yRn0AAAAgadSHrFEfAAAASBr1IWvUBwAAAJJGfcga9QEAAICkUR+yRn2AOHV193Sd7Pnn3v72jqOD/1j8vw53dPb19Y/sYQuFypnTqwf/cXLVxMmTJhb//sYvzCr+zewbZnn+AQBKqLfvD0Pd4SOdvX190d+0Hmor/l/RvHfk7c6RPeyMadWfvbTyfHPdpYXCtWcNfuoD6gMIDR+XhYNvtBUPSye6e7pPnir7f9Vgp7h2+jWXFiqjg9mUSRPPPqoBAPCpWg+1RRNdNONFfzOauFAqk6omTBkY4Yo/ZCq2ieKMl40nvGz1IXqNDcfqAyQ8Nxzu6GzvOBodkEZzIkN5D2DFEhEdtz57aaXTJQCA3Cr+AOngG23tHZ2HO44m4cdIQ1c8e2KwSqT0dImy1YcFDyyLnrItG9dlJuQkhPoAoywOe5tbBnJDyo5JQ1RMEtdOv2Zy1cSZM6qzVNMBAD452h081Nb6xsc/SSr7qQ0lN5gkime/Jv/nTOWsD62H3iwUKrdsWHfrzXN8Y5SK+gDD1dvXf/CNtn3NB6KDUyaLw4UVr90oHrdmTr8mLR297vvb67c1ePeO2Owbrm96dlt6X6/offvT11/Rzs6n9VDbggf+evSP0/Ts90s4yxZnP69O5i1ftnjFXy+x4Od2wU+I4g+TogEve8Vh6HNdAntEmetD8e/nzZ3jJAj1AeKPDnubD+xrbtm3v8Wzcc6Ycu1AhkhyjDCM5rw+5HaeVh9QH7BaXni0a32jbe/+ltRdMBvOjGnVA+e9Vt/4hVll3xosEfWhYiDSOAlCfUjjeDf4985gT5Gdu3aLDsONEdEnkJnTq5OzX49hVH0I8SFHfVAfUB8s+Gm0N5rrmg+IDkMxeHJENN3FP9olpT4UPbhwQbRa+Qg3qoHjxPbDv/479SH0Avdi9PH1E59d77njtvWPrvAGTqz2js6GxucdmbLxSc8wqj6E+HisPqgPqA8W/BTp6u5p2NG0t/lADq+cTelol6z6UDGwI9rWjetMEiPW//t3m36xdFi/ZfF/fNXzNvQ1btXa2gsMT4VC5QvPbsvJDXtTZOeu3S/u2m3qVR/IXn2wAYT6gPpADuvD3uaWZ3Y8b0lRH0pzBHISxGi0HHuy8/T+If7imZ//r7OnOG21lAc/ASI5evv6d76yu2HH84q4+kBW60PFwBWte15u9JqqD6gP5KE+7Ny1O3pLGO3UhxIfgZwEMWIffPSb3W+v/af3j130V1ZfNnfOVQ97xoYyxq1cUzv0Zc4onITu0ND4fMOOJhdZqA9kvj5UDPzQYv3q5V5W9QH1gQzXB91BfQh+BHISxIgDROuvtl/gDIjKsVfMqrqv+vKbPVcX/RBb80Tdi6++Vt6JjWFpaGyq27Zdd1AfyE99iPzge5vtXa0+oD6QyfqgO6gP8R2BZkyr3rpxnfPYR9Ygfvn/tZ7+7bHTfzwP4k/G/Nnnxl115fjZl427yvMzlJWuZlP9yD7E+kFcWextbqnZVOfgpD6Qw/pQKFTueakxObdlUR/UBwcLC776UJLVbFgnIKM+lOYI5K5axOmiu0te1KSqCT99/RXPZIpeMtQHw2jaXy9XvakPqA9kpj5Eo13Npnr3R1cfynYEchIE6ZqS/37fy34K54OoQ5QX3TAa5+vlvDP1AfWBDNSH6EW3e5f6UOb6kMDxl+yNayU8ucvWDzFo7+iMXrIjb3d6KtQH1Iei72741le/crvDmfqA+kAa64PRTn1IVn2ocBIEAYx4d0n1wedPhyivvmE0Ua+X2x6rD6gPpLQ+eK3VhyTWh+JssWLZksWLFnjTMHqBbpHwi9bX3a4lkCTv8hCtTjOnV19aKBQ//ER/M3PGkD4FHXyjbfBjQ/TXwx2dSTvhUH0wjKbl9ZoxrfqFH27L8wqsPqA+kK760NvXv/ShvzXaqQ8JrQ+D30tbNqxzaT0j1t7RWbOpLsRKl5lbKydzql7y0CMJWb6LB6RoOo8WoimTJpb8bJfoLdrb1xcdvaKjcnvH0fIet9QHw2iKXq977rhty8Z16oP6gPpA8ofSHI52h498/NfoD36iu6eMd/RQH0by/nASBCMQfZZraHw+3MHMZRcZ/swZLTs33jAren1v/MKs+M/u/kOGONLZdbIn+ps4R3n1wTCartcrzxtAqA+oD6SlPjQ0Nj2+ub7so92tc+fM/sKsGweiQ1kW7RPd0VzXmfnRLvX1YfCbykkQDOs7POitg226HuhTd8n35hiWSVUTbr35pujDTNKuJ4+OVYc7jsZwxFIfDKPper3yvAGE+oD6QCrqw6o1tWUc7WZMq7715jnRdGe0Ux9GMmREn/dsc81FP8FGy1y4WwdHH1DXr14RLWSe6pK/cPd+bVlZNkCO1pZoYUlgdLjAp47DRzo//mvH0dImtszXh18ePuh7LUv1obgm73l5Rw43gEhmfciSks+x7ulmwTfaxXlouPXmmxYvXJCWH123d3QefKOtvePowUNtaR/tslMfiubNnbNl4zpb/fGpAu0uefY38OJF93n7Zeb4NPuG6+8Z6A7pfeq6unuiA1XrG20lOVypD6SuPhQHg6ef2qw+qA/qgwXEgm+0i0a7Bxfel+ofE0aj3eGOj3/IdPCNttE/gepDCRQKlVs2rPPDZ84WbnfJwbVs/eoV7gIb6LW794FlMW9EdM8dt331ztszNnOPvkSoD6SxPkS+/cjyvO0PpT6oDxYQC77R7pzRLvoWy9h1+r19/QffaBtNiVAfSsZJEAx+WwbdXdIlPxk7PkVLR/SCZn4TmZGVCPWBlNaHyE9easxVIFYf1AcLiAXfaJfh7vCpH3n2Nh9I/miX2fpQ4SQIKir2NrfUbKoLt7tktJytf3SFyJWN49PsG66P1t8cztnFiwmjzyoX3Q9FfSC99SFvG0CoD+qDBcSCb7TL7X0Jurp7og9ByRztslwffD7Ms+i7rmZTfbjdJWdMq37s0eVmsnB6+/q/dMud8Ryf3Lh3UPFYtbf5wKc2O/WB9NaHijTc8V59UB88sRb8bA/n8+9eFM9oZxv4sw8H0XR3vksz1IdQ77+tG9c5fOZH0N0lfVKNJz3EtheRq7TONyJ8spqrD6S6PuTqA576oD5YQCz4uR3tHly4IPpuMtolc7TLRX3wRsyP9o7OlWtqwy1tOdkUICfHJ3t2DFF0rNrXfODgobbouVIfSHV9yM/HafVBfbCAWPDzOdq57j7ho12O6kOFkyCyvq5FB6dndjR586TdqjW1L776WuivMmNadfSCuk2JYdQwmrf6EM2mP339lcz/KEJ9UB8sIBb8HI52L/xwm580J1y+6kORkyCyJ/TukmaCjH1EsR2Mt4phNLf1oSIfG0CoD+qDBcSCn7fRbsvGdZ5t9SGJ9aFi4OfY25/6737smQGhd5fM7Wa5qR6XL+zBhQvWr17u2TbNGEZzWx/y8ElPfVAfLCAW/PyMdt/d8C0X0qoPia4PFvrMHI0adjQF2l3SZrkxi+cmF45PhlHDqPpQ9IPvbc7wCq8+qA8WEAt+2cVzkwujnfqQmvpQ4drvNM9Vjz1RH273GpfnZHJNcHwyjBpG1YdBhULlnpcas3pqm/qgPlhALPiZH+2iZXz7U5utUepDqLdjtC5Hfw0xvljxUyT07pKzb7h+/eoVglT2PplID94zhlH14RwzplXveblRfVAf1AcLPqlb9guFyhee3WZiVx/C1odoXW7v6Fzy0N+WfH9BJ0Gkwt7mllVrawOdwRWtYiuWLVm8aIHnOWbRN/WX714kPWAY9XrFL6sbwagP6oMFxIJvtEN9KEF9qAj50+9vP7Lch89k6uruWbW2NtzpW26CUEbz71oU9BbQvq8No4ZR9eECMrkBhPqgPlhALPgZHu2kB/Uh1voweGRduaa25CdBuMdBMo864XaXnDGt+rFHl5uuyqWhsenxzfXhHt8dmAyjhlH14cIyefqu+qA+WEAs+Fkd7XyzqA/lqQ8VAydBrFpTW/K7LToDP1HzU7jdJaMXevHA7pKe53IJvRny7Buub3p2m+fZMGoYVR8ubMa06hd+uC1Lp7+pD+qDBcSCn8nRbt7cOU8/tdnzrD6Upz4UBdoLwEkQ5RV6d8lo8Vq/ernXt7xWral98dXXAj14oVD509dfcTWNYdQwqj4MRcbOk1If1AcLiAU/e6Nd9kqx+pDK+lDhJIjM2blrd82m+kDddFLVhK0b1xmnMjMcG5oNo4ZR9aEksnQhsfqgPlhALPgZG+3c5EJ9SFB9KGpobKrbtr3kH1nnzZ2zZeM6mS0eoXeXjN5Fixfd59XM5OhmjDOMGkbVB6Ot+qA+WEAs+Jkc7Wwirj4krj6E++waTSRbNqzL3p7YuRpPXUqTycn4U82YVr3n5UZPsuXCMJq91+ueO24Ld05vRYZO61Uf1AcLiAU/S6OdnbzUh4TWh6JAJ0Fk9a7gCVmwQtzBpKhQqIxeODfmyfbcdrafvNToxDzDqGE0k69X9GF4b3NLuC2BKrKypZn6oD5YQCz4mRntokl+z0uNfoKoPiS3PkTaOzqjT7Mlv1eCTzUl19vXX/NEXbifZT04cFcLl1pkciw+3yuuEhpGDaMZrg/Rh+HQd5LPwPm96oP6YAGx4GdmtPPdoT6koD4EWq0ytid22QXdXXLGtOqtG9epRXkY2ga5z4Vh1DCah/oQ+o5uFen/YYP6oD5YQCz42RjtJlVNiEY7z7D6kI76UBHgJAirVUkE3V3SzUqSLPqW/PLdiwI9eJa2rMcw6vW6wIfhvc0tX//GI+H+g6N5d8/LO9KbMtUH9cECYsHPxmj3g+9ttvWe+pCm+lAxcG5/tGyV6jJRR+JkHkUG3XPHbesfXeGn34kV7kbQ6rhlxDCan/oQqdlUbwMI9UF9sIBY8DM82tlsUn1IZX0YPBKXZF9Dt3sZ5TwUbnfJ6MPn1o3rzElJ1tvX/xezbwn04E58MIwaRnNVHyoC71+b6iO++qA+WEAs+BkY7SxB6kOK60NFiTY4VB9G/OSvWlO7b39LiAcvFCoXD+wu6XlOuIbGpsc314d4ZCc+GEYNozmsD9GR5Uu33Bl0A4iUzr7qg/pgAbHgp320c+KD+pD6+lC0t7ll1draEQ8rjsQjW5hC3AO1aN7cOetXL3cbnlSIPicEOvPFiQ+GUcNoDutDReCN1itSu5et+qA+WEAs+PEIdxMiOz6oDxmpDxWj+Dl8NIW81fq6983QtXd01myqC7cL7vrVKyxMKXozBNqUyIkPhlHDaG7rQ0XgvYQq0vnzN/VBfbCAWPCNdqgPSakPRSM4CcKxYeh6+/obGp8PNxFGr8XiRffZXTJFwm0R5xvTMGoYzXN9qAi/AUTqFhn1QX2wgFjwUz3aOadVfchgfagY5n0fXX00rLkn3O6S0QuxfvWKVN+JPZ/CXXbxi9bXdSjDqGE0z/Wht69//l0LA60wafwcrj6oDxYQC356R7uUXvKG+jBUQ9mVIPrE+/RT/923wUWF3l1y/erlUmgahTs37547btuycZ1n2DBqGM1zfagIfMP54gFoz0uNadljSH1QHywgFnyjHepDQutDxcBJENHSdr7bYTgkDFHQ3SUfHLirhQCUUuHOzbMpkWHUMKo+DB6DAm29XjRjWvWelxvVB9QHCz5BRzsrj/qQ/fow2CD2Nrfs23/gn3v7u072zJxefe30axYvXOB+ChcVdHfJaOB77NHllqFUC7Qlso1gDaOGUfXhbEsfeiTQyXdFDy5csH71cvUB9cGCT6DRzn6T6kOO6gMj0NvXHx0VArXP6LPlimVLFi9a4HlOta7unv80764Qj+zcPMOoYVR9OOeQFHoDiFScb6U+qA8WEAt+Ske7tERe1AfKYG9zS82mukBz3ry5c6IPli61yICdu3Z/c+13cvsxAMMosdWHioFz8e59YFmgawArUrIBhPqgPlhALPgpHe0sO+qD+sCn6OruqdlUH+gE10lVE7ZuXGfpyYxVa2rPt6nKKD8DuOzCMGoYVR/iHIuLZkyrfuGH25Icx9UH9cECYsE32qE+qA8ZEW53yWjRWTywu6QnOUsC3ZBp3tw5Tz+12dNrGDWMqg+xTcaDEn7Zl/qgPlhALPhpHO1cUas+qA/8K+0dnSvX1IbYY6Zi4LamWzass8dnxoS7MvDbjyy3J4hh1DCqPnyq3r7+e7+2LNDRqui7G76V2DtAqw/qgwXEgp/G0S7J6yrqA7EKurvkpKoJ61evcAF/Ju1tbvn6Nx4J8cg/eanx2unVnmHDqGFUffhUMWwA8cKz25K5CqkP6oMFxIKfxtHu7/e97MeQ6oP6QNjdJR8cuNTC7pJZFeh20K4MNIwaRtWHi8rtBhDqg/pgAbHgp+sVqXCvTfVBfaBi4NyqVWtrS3uIHTT7huvXr17hx9dGtBGw6YPRxzCqPgxFoAA6KJlXKasP6oMFxIJvtEN9UB/St9w37GgKtLvk+tXLXdmVB9fNviXEW8iCYHUyjKoPQzT/rkV52wBCfVAfLCAW/NSNdvbzUh/Uh/yKBpfHnqgPNK7dc8dt6x9d4VKLPAi3L5GZ2DBqGFUfhr4Qzb97UbgNICqStw2N+qA+WEAs+EY71Af1IQWC7i45Y1r1Y48ut7LkR6km4E/6RevrApZh1DCqPgxRuD3SiiZVTdjz8o7kLErqg/pgAbHgp26086KoD+pD7kTz2aq1tYEutVixbInzqUwMpRr07UvkrWUYVR+GJfQGEIm6Yll9UB8sIBZ8ox3qg/qQXEF3l4xmsvWrl7uDTg4FGvdn33B907PbPL2mH8Oo+lDeT4znSM5Fy+qD+mABseAb7VAf1IfkLuuBdpecVDVh68Z1ZhfzWWk9uHDB+tXLPb2GUcOo+jAsvX39X7rlzjxsAKE+qA8WEAt+ukY73wLqg/qQC0F3l4xessWL7nNxfp4F2mrersgYRtWH8n4sP59CofKnr79S9gOf+qA+WEAs+EY71Af1IUF6+/prnqh78dXXQjz47Buu37JhnUstuHLmjSEe1kCMYVR9SNSb55wjYNnPH1Yf1AcLiAXfaIf6oD4kxc5du2s21QfaXXLLhnW33jzHk4xDFIZRElgfKsJvAFH2iUV9UB8sIBb8dI12SbtvMeqDdbk0gu4u+eDCBdFr5FILSjv+GhqIZxjNjAR+gyStPvT29c+/a2H3yVPh/sjl/dyuPqgPFnwLvtEO9UF9yOzyPfuG69evXqFZ4hCFYVR9SH59iLR3dH757kXh/sjl3QBCfVAfLPgWfKMd6oP6UM7PgSvX1Ib4OU80YK1YtsQ+McR2iJoxrXrPy42eXsOoYVR9GKWGxqbHN9eH+1OXcbFSH9QHC74F32iH+qA+lEHQ3SXvueO29Y+ucKkFcY4L7giNYVR9KJWlDz2yb39LuD94uW4PrD6oDxZ8C77RDvVBfYhbuN0lZ0yrfuzR5YYSHKIwjKoP6a0PMWwA8YPvbY5/J2b1QX2w4FvwjXaoD+pDfMLtLlkoVC4e2F3Sk4xDFIZRw2iq60PFwAYQ9z6wLESmHzxo7nmpMeZbUKsP6oMF34Kfotfinjtu27JxnVdTfVAfUqm3r7+h8flAy/S8uXPWr14e8xSFccFSgGFUfQj3YXjnrt3fXPudcH/8+C9pVh/UBwu+Bd9oh/qgPsQxcATaXXJS1YT1q1fEf/oo6VWzqf6ZHU0OURhG1YeE14fIqjW1gTZIKop5Awj1QX2w4Fvw1QfUB/UhrHDbd0dP/uJF99ldkvIOZ5YCDKPqQ6APw719/fd+bdmRtzvDPQnf3fCtr37ldvXBAc6hzYKf3gXfaIf6QNjVefYN12/ZsM6lFjhEYRg1jGa4PlTEsgHEC89uu3Z6tfrgAOfQZsFXH7z/1Qf1wep87py0fvXy2H5Qg+HMUoBhVH0o74fhvc0tX//GI+Eef8a06hd+uC2GEwnVB/XBgm/BN9qhPqgPqVmdHxy4q4VLLXCIwjBqGM1PfagItmHNoHi2dlcf1AcLvgXfaIf6oD6kYHWeMa1668Z18ZwaiuHMIQrDqPqQtA/D8+9alPYNINQH9cGCb8E32qE+qA+JXp0LhcoVy5YsXrTAM4lDFIZRw2hu60NXd8/8uxelegMI9UF9sOBb8I12qA/qQ3JX53lz52zZuM6lFjhEYRg1jOa8PlSE3wBiUtWEPS/vCHfMVR/UBwu+Bd9oh/qgPiRxdY5moK0b1xkvcIjCMGoYVR9ie4/Nmzvn6ac2qw8OcA5tFnz1wftffVAfcrQ6J3BOJRsCbd5mKcAwqj6kes4e9O1Hlge62lF9UB8s+BZ8ox3qg/qgPuAN6RBFQt9dFkP14Ry9ff1fuuXOcBtARH7yUmOIDSDUB/XBAmLBN9qhPqgP6gPekKMV9HRlDKOoDyE+xp9PoA0g1Af1wQJiwTfaoT6oD+oD3pCjNfuG65ue3ebp9e4yjKoPqV7Kgq5p6oP6YAGx4BvtUB/UB/UBb0iHKAyjXq+UfRhe+tAj+/a3hHv8kk846oP6YAGx4BvtUB/UB/WBHAl0y7oZ06r3vNzo6bXcGUbVh9j09vXPv2th98lT4b5Eaf9o6oP6YAGx4KdotJtUNeGnr7/i6VUf1Af1Aco//nrTYhj1epX9w3B7R+eX714U7vELhcpo+C7VBhDqg/pgAbHgG+1QH9QH9QGHKIeotI5riTox0jCqPsSvobHp8c314R6/hN9i6oP6YAGx4KdrtPtF6+sl338X9UF9UB9Sr+d3H/yP984c7X8/+pvBf3lN5Z9eUznupsvHFy4Z4yka1NvX/xezbwnxyAZi9cEwqj6URVo2gFAf1AcLiAXfaIf6oD6oD+nuDj84fnL3qdMX+DW3T7hs5dVTNIhBV8680SFKfTCMkpn6EE3e935t2ZG3O8N9iR98b/OtN89RH9QHLPi5Gu1KsvShPqgP6kNGHO1//69+frT/w48u+iurK//0//330wSIoutm39LX11/yh7UaqA+GUfWhXNo7Ou99YFmIla2oUKjc81Lj5EkT1Qf1AQt+An3pljtDbMHrW0B9UB/UB/6g78OP/ts/tJ99qcWF3Tf5ipVXT/G8hZjPih5cuGD96uWeXvXBMKo+lMXOXbu/ufY74R5/9Hf2UR/UBwuIBT9do928uXOefmqzp1d9UB/UByqe63q37p0Tw/otzf/Hv3f6Q2TVmtoXX32t5A/rvtDqg2FUfcjk4jZolI1VfVAfLCAW/HStfu6nrj6oD+oDf/BXPz/adqZvWL/l/7nu3950+XhPXYiJwftWfTCMqg9ll/ANINQH9cECYsE32qE+qA/qQ17qw9KpE5dOrfLU7W1u+fo3HgnxyH+/7+VRXhdtQVAfLIbqw2jEsAHEC89uu3Z6tfqgPlhALPh5GO0sOOqD+qA+oD6MSrj7QtsbWX0wjKoPGZ7Ci2ZMq37hh9suLVSqD+qDBcSCnxDtHZ1fvntRiEf+9iPLFy9a4BlWH9QH9UF9UB9GLtCdmWw8qT4YRtWHJKjZVP/MjqZwj3/PHbdt2bhOfVAfLCAW/MyPdjaeVB/UB/UB9WG05t+1KMSl0XYnUh8Mo+pDtle5Qd/d8K2vfuV29UF9sIBY8LO96BUKlW+1vu7pVR/UB/VBfVAfRm7pQ4/s298S4pF/0fr6CE5ItiCoDxZD9aG0urp75t+9KFEbQKgP6oMFxIIfTrib/vzkpcaRbXaD+qA+qA/qg/rwsYbGpsc314d4ZFs/qA+GUfUhIZK2AYT6oD5YQCz4aRztbP2gPqgP6gPqw6iE23jS1g/qg2FUfcj2B6SzDeuKaPVBfbCAWPDTONolatJAfbAuqw/qQyoF2p1oUtWEn77+iqdXfTCMqg9Z/UR6jqH/VFB9UB8sIBb8NI52Fa6rVR/UB/UB9SGxE7nrA9UHw6j6kBy9ff1fuuXOcBtADH3RUx/UBwuIBT+lo90I9tlFfVAf1Af1QX0IOzcUuT5QfTCMqg+JEu6E5KJJVRP2vLzjoj8YVB/UBwuIBT+lo537bqoP6oP6oD6oDwkdx118oT4YRtWH/AzlQx/N1Qf1wQJiwU/paBf5+30vT5400ZOsPqgP6oP6oD6MULjrA118oT4YRtWHpAl3p+Gii572pT6oDxYQC35o182+JdCFZr4d1Af1QX1QH9SHhM7i99xx25aN6zzD6oNhVH1Ijt6+/vl3Lew+eSrcl7jwU6E+qA8WEAt+ekc7Z7aqD+qD+lAGB947c7T//aP9v628ZEzVZ8bedPn4ayrHqQ8pFe7W0IVCZXSIsj2y+mAYVR8Spb2j88t3Lwr3+Bde+tQH9cECYsEPbeeu3d9c+51AD/6D722+9eY5nmT1QX1QH+LwXNe7Tx8/2f/hR+f8+1njCyuvnhx/g1AfRq+ru+c/zbsr0IPbHll9MIyqDwkUrrpe9FtSfVAfLCAW/NB6+/r/YvYt8a9vqA/qg/pQMn0ffvR4x/ED7525wK9ZcfWU+ydfoT6kzvy7Fh15uzPEIztDT30wjKoPyRR6A4jzjUbqg/pgAbHgp32Js/6oD+qD+hA8PfzVz9/u7P/tRX/lrPGF9dOnTvzMWPUhRYL+GNAhSn0wjKoPCdTb13/v15YFCq8XeE7UB/XBAmLBj0HQiy+c/qA+qA/qQ1h/89Y/Xvish7NVXjIm+ngfz0kQ6kNJBL34wiFKfTCMqg/J1N7Ree8DywLtDF8xsAHEnpcaz7k7nfqgPlhALPgxCHrxhSVIfVAf1IeAfnzq9OMdx4f7u+I5CUJ9KBVn6KkPhlHvxhx+mwf98WBkxrTqPS83qg/qgwXEgh+/VWtqX3z1tUAP7mdL6oP6oD6EMvd//vyT20wORQwnQagPpbK3ueXr33gktvnbgqA+GEbVhzwM6JEHFy5Yv3q5+qA+WEAs+DEr1WpzPm5+oT6oD+pD6Y3sxIezBT0JQn0ooS/dcmf3yVOBHtzNL9QHw6j6kEwxbABx9oyuPqgPFhALfjZGOzuLqw/qg/pQek8fP/n08Z5RPkjlJWNWXj3lv0y4TH3I2wwxqFCojA5RlxYqPc/qg2FUfUiaODeAUB/UBwuIBT82oe8u7LtDfVAf1IcS2/rOiee73i3JQ910+fhvT59auGSM+pBMQfeerPjE6ccWBPXBMKo+JEfQq88qBi5Ae+GH2y4tVKoP6oMFxIIfm96+/i/dcme4tBr5yUuN106v9lSrD+qD+lC2j/cXUHnJmPXTp950+Xj1IZlCX//sEKU+GEbVh8Sq2VT/zI6mcI9/zx23bdm4Tn1QHywgFvy0v0Zns7eX+qA+qA+lVJIrL85RwpMg1IfSCn36w+BP/ywI6oNhVH1IoPl3LQq6AcR3N3xryqSJ6oP6YAGx4GdmtPM9oj6oD+pDKR1478zfvPWPJX/YUp0EoT6UXMzbv1sQ1AfDqPqQqDF9/t2Lgm4AsWLZkpJchq0+qA8WfBIy2lmR1Af1QX0opTtaf9Hzuw9CPPLoT4JQH0IM36EbuVs0qQ+GUfUhsUJvAFEoVJakbpj11QcLPkMf7YJ21Yp/vbcu6oP6oD6MSt+HH21958TuU6dDPPgoT4JQH0II3cijQ9QLz27L8wYQ6oNhVH3I2weqklMf1AcLPola1lxdqz6oD+pDKf3sTN/jHccDnQRx+4TLVl49ZQQnQagPIcTQyHN+iFIfDKPqQ94+waoP6oMFxIJfRjHc/KLij3vrerbVB/VBfSiNvg8/er7r1yXfhLJo4mfGfnv61P8wvqA+ZHWeOMe8uXOefmqzp1d9MIyqD7md1D3h6oMFxIIfm4bGppJsOiNAqA/qg/oQq6P979d0HO/s/22IB79v8hVLp1YN/SQI9SHc5D3/roXdJ085RKkPhlHvxnx+GC7VrTHVB/XBAmLBT4jQt/XxLaM+qA/qQyjPdb379PGT/R9+VPJHHtZJEOpDOKG3XstzgFAfDKPqQ24/WakP6oPvEQt+ubR3dH757kUxfKHvbvjWV79yuydcfVAf1IdS6vndBzUdx4f74X+IhngShPoQ1NKHHtm3v0WAUB8Mo96Nuf0wHM8y6AlXHxzOLPjxqNlU/8yOphi+0LcfWb540QJPuPqgPqgPJXbgvTM1HcfLdRKE+hBUbFc+5y1AqA+GUfUhRctgDJehecLVB4czC3721jR7QKgP6oP6EETfhx89ffzk813vhnjwC58EoT6EFs/1F3k7RKkPhlH1IUViO1fZE64+OJxZ8DO2pgkQ6oP6oD6EEu6WnNWVf7p++tRrKsepD2UR20l68+bOiQ5RebgNp/pgGFUf0iWeveI94eqDw5kFP70v3Pnk/Cbr6oP6oD6E9fTxk4Fuyfmp1UB9iEFvX/+9X1sWwybJxUPU9qc2T5400YKgPhhG1YdESdoGEOqD+mDBJ1HfKRdQKFS+8Oy2a6dXe9qHovVQW0NjU29fX8yjnfpgdU7r+nu0//2t73SF2I3ykydBqA/xaO/ovPeBZTFsAFE8RG3ZsO7Wm+dYENQHw6j6kBxxdlhPuPqgPhDDmhbzpja+lS5q567dDY1NxQNN/KOd+mB1Tvf6G+6WnGfnA/UhNrFtAFH04MIF0aqS1fP01AfDqPqQRnF2WE+4+qA+kL01LRpXtmxYl/lTXIerq7unYUfTzl27z34t1AfrsvowbD2/+2DrOycOvHem5I88eBKE+hCnmK98njGteuvGdZk8T099MIyqDykVTYffXPsd9UF9wIJvTRuZQqFyxbIlbsY5+Py/uGv3py5Z6oN1WX0YoXC35Fw6deLPzvSrD3Fatab2xVdfi/MrZvIkCPXBMKo+WAY94eqDBcSCnwRl2VV3xrTqxx5dnttFrL2jc+eu3eec7KA+WJfVh5IJekvOETQL9SFdk/ekqgnRCvPVr9xuXFMfUB/KLiEbQKgP6oMFn/SOdkX33HFb9M2Vnwsxurp79ja37Ny1eyhHEPXBuqw+jNbPzvRtfedEZ/9v1Qez3cg+YEfrTDambfXBMKo+pH2CnH/3ovJuAKE+qA8WfDIQIPLQIIYVHdQH67L6UGLhbsmpPsSmjD/6y0aDUB8shupD2sW8Ea8nXH1QH8hwgMhkgxhZdFAfhmTGtOrtT222f6n6MEQ9v/ugpuN4iFtyqg9xBoilD/1t/GdADK45ixctSO+1GOqDxVB9yICaTfXP7GhSH9QHC4gFX4Ao4Txzz1duT/XFtq2H2vY2txx8o22UP6VTH6zO6kOJhbslp/qQk6NUoVAZHZ8WL1yQuvSpPlgM1YdsmH/XonJtAKE+qA8WfDIZIAYHvOh/abnxWfE0h9ZDbQcPtZXqojz1YUgmVU3YunGdw6H6MER9H370eMfxELfkVB9ydZSaMa06OkTdevOcVGSI3r7+mifqSvukqQ+oD+WaOMu1AYT6oD5Y8EnRyzrij5a33nxTtNZFM17SnqX2js6Db7S1dxw9eKit++Spkj+++jAM99xx2/pHV2TsDnnqQzgH3juz9Z0TPb/7QH1IqbLcq+kCGeLGL8xKWizv7esvHqJaD7WFuFwl8/Uh54J++FEfRin6pl7wwF+rD+qD+ZYsvd927tr9zbXfSdQzE4060aIXzXjlWvraOzpPdPeEm+XUh1EpFCrXr16epTvkqQ9BxXlLTvUhhL3NLavW1pZ3B/hzlqAbb/j4+DRzRnW5jlLRwenwkc7oKHW4ozP0udnqg2FUfcjbe159UB8s+Bb80B+2731gWXJGu7PNmFY9c3r1tdOvica8yVUTQ5z6Gk1x/9zbH01xXd09XSd7ynKvN/VhJM/alg3r7EapPgxRPLfkVB/CHaVWrqkt1yXQF12LigenG78wK/RRqpjGY34e1AfDqPqQsU+8nnD1QX2w4JddGe9xNoIe8dlLKwdnvGunXxP941B+YzSzdXX3FP+w0RQ3MNG9mYQ/kfpg1VYfYhL6lpzqQ9CjVMl3NAhkUtWEKZMmXlooFK/RiP5m5owhXaxRTAxJO0qpD4ZR9aHsq9+Xbrkzzh8Sqg/mWAu+BT8e5b2/T26pD6Md9HO+G6X6MCxBb8mpPoSWtKswHKIMo4ZR9SEGMW8A4QlXHyz4FnyjndFOfbiQPO9GqT6MwI9Pnd76zomS35JTfYhBV3dPdJRKyKlrDlGGUcOo+hCPOLfg9YSrDxZ8C36cevv6V62p3be/xWukPqSmPlTkeDdK9WFkQtySU32Izc5du2s21Svl6gPqQ34sfeiReKZzT7j6YMG34MfPSRDqQ+nFUO5zuBul+jAaPz51+vGO4+pDGqVoJwiHKMOo+uDDcEkWvfl3LQxx73dPuPqgPljwE7LKRa+7nSDUh1KK56zpXK3m6sOIPdf17tPHT5bw+gv1IX7tHZ01m+pciKE+oD7kZMX78t2L1Af1wXxLht9vRjv1ofRiOGs6P7tRqg8jEGjvSfWhXPY2t0QHqhh+JOgQZRg1jKoP5RXDaaSecPXBgm/BN9pl1T133LZ40X3F+7LlqD5UxHVqTR52o1QfhqvkpzyoDwmxc9fu6NvBgUp9QH3ItlVraoNedOYJVx8s+BZ8o13GTKqasHjhfV+98/ayfC5ORH0oaj3U9tgT9Ufe7gz3JTK/G6X6MHRBb7epPiTnQPXirt1O2FMfUB+yqrev/96vLQs3O3nC1QcLvgU/aaNdQ2NT0A+MWRV9EL517pz4T3ZIbn0oit5Pddu2B70QI8O7UaoPQxTulAf1IYFaD7XtfGW3PSlHaVLVhK9+5fbkDCuGUfWBovaOznsfWBZocPKEqw8WfAt+Mke76DOjG3MO0T133Dbv5ptuvXlOEv5jElcfKgZ2o6zZVB/0/VQoVC5euCB7q7z6cFGhT3lQHxKrt69/5yu7G3Y875y9oZsxrfrGL8y6dnr1jTfMSlqxNYyqDwzauWv3N9d+R31QH9QHcvV+iz4zRqtf9D+j3ad+2r117pzZX5h16803JWrngSTWh6LWQ20r19QGfTNFg/Vjjy7P0mFVfbiwGE55iFReMmbp1Kr7J19h4Uum9o7Ohsbn9+5vcR/pTz1WzZxeHa2KA9HhmiRvlGMYVR84W6ANIDzh6oMF34KffHubW/Y1HzDaVQycqXrjDbOSc6ZDmupDxcDPKqMPCaGXmwcHToLIxm6U6sP5xHbKw32Tr1g6tapwyRgHtrQcqw4east5Mp99w/XXTr/m2unVMwf+ahg1jKoPaRRoAwhPuPpgwbfgp2gZ3Nt8YF9zSzTa5S1DzJs7548/Okr6IJfo+lAUw41eC4XKLRvWJTYRqQ+jFM8pD7PGF1ZePfmaynEOaakTLTLR4ar1UFtO9qdMaW4wjKoPPgxfWFd3z/y7F5V25vaEqw8WfAt+Gu1tbonmumi6y/BPmKJxrlgc0rVKp6A+FO3ctbtmU73dKNWHYYnnlIeJnxm78uopN10+3sEs7Xr7+g++0dbecTRLJWLGtOopkyZeO7362unXzJxenckNdwEAPqmru+dgNNS90ZaBc12jiW7mwDiXinMcUl8fih8Map6oC7pxfdp3o1QfzhbDKQ+Vl4y5f/IV903+vEstMqn1UNvhI53tHUcPd3Sm5d5Os2+4fnLVxMkf54ZritHB6wgAcPYPmaLRLvlXZxSHuo9/ejSjOjOnoaWpPgx+HnjsifqgnwTSuxul+lAUzykPN10+fuXVUyZ+ZqzVPCfaOzpPdPdEB62u7p6ukz3lPW5FB6Tor8WNIaO/fvbSyoRvEgkAkKgY8fFPmI50RkNd9Df/3Ntfxh81Fee66OPnpYXCzBnVGR7q0lcfBj9mN+xoCjr6p3E3SvWhIpZTHiZ+Zuy3p0/9D+MLFm7aOzp7+/qiI1Z03KoYOMEvOoYV/68R54kZ06o/e2nlH49Gf8igxcQQHZOczgAAEC5JRH9z8I22s/8xcqK7Z2TXbkyqmjDlj9e9DmaF3M51aa0PxSl/1dpau1GqD4NiOOXB3TQBAABGIMX1oWhvc0vNprqgm4ikaDfKPNeHGE55uH3CZSuvnmKLBwAAgOFKfX2oGDglJvrU/cyOpnBfIi27UeazPsRwyoO7aQIAAIxGFupDUXtHZ82muqAXYiR/N8oc1ofQpzxM/MzYpVOr/suEyywWAAAAI5ad+lDU0NhUt217bnejzFV9iOGUh6VTJ7qbJgAAwOhlrT5UDFyIUfNE3YuvvhbuSyR2N8r81IfQpzzMGl9YP32qu2kCAACURAbrQ1HrobaVa2rzthtlTupDTcfx3adOB3pwd9MEAAAouczWh9F8Gh+6pO1GmYf6cOC9M3/z1j+GeOTKS8bcP/mKpVOrrAsAAACllfH6EOnq7lm1tjYnu1HmoT78X//Q3tn/25I/rLtpAgAAhJP9+lC0t7ll1drazO9Gmfn60PfhRzf/z5+X9jFnjS8snTrRpRYAAADh5KU+VAzsRhl9OH9mR1O4L1H23SgzXx9+dqbv//750VI9WuUlY1ZePcXdNAEAAELLUX0oau/oXLmm9sjbneG+RBl3o1Qfhu6+gS0eXGoBAAAQg9zVh6KGxqa6bdvDXYhRrt0o1YehcDdNAACAmOW0PlQM7EZZs6l+3/6WcF8i/t0o87Dr5Bf+x89G/Hsnfmbsyqun3HT5eN/5AAAAccpvfShqPdS2ck1t98lT4b5EnLtR5qE+/M1b/3jgvTPD/V3upgkAAFBGea8PFQO7UTY0Pj+CD+1DF9tulHmoDz8+dfrxjuPD+i23T7js61OrXGoBAABQLurDH3R196xaW9t66M1wXyKG3SjzUB8id7T+oud3HwzlV1ZX/unKq6e4myYAAEB5qQ//ys5du2s21ad3N8qc1Iej/e//t384cuFfU3nJmKVTq+6ffIV3NQAAQNmpD+fq7euveaLuxVdfC/clwu1GmZP6UDFw/cXWd070f/jRp/6/7qYJAACQKOrDp2s91PbYE/VH3u4M9yVC7EaZn/oQ6fndBz8+9d7PzvS3nekb/Jc3XT5+6dSJ11SO8x4GAABIDvXhIh/mG3Y0Bb0Qo7S7UeaqPgAAAJAW6sNFdHX31Gyq37e/JdyXmDd3zvrVy0uyG6X6AAAAQAKpD0Oyt7mlZlNd98lTgR6/UKhcsWzJ4kULRvk46gMAAAAJpD4MVW9ff0Pj8yP4bD90M6ZVb9247trp1SN+BPUBAACABFIfhqe9o7NmU13roTfDfYnR7EapPgAAAJBA6sNINDQ21W3bHm43yklVE9avXjGC3SjVBwAAABJIfRih3r7+mifqXnz1tXBfYgS7UaoPAAAAJJD6MCqth9pWrqlNzm6U6gMAAAAJpD6UQPSZv2FHU7gLMYa+G6X6AAAAQAKpD6XR1d2zam1t2XejVB8AAABIIPWhlPY2t6xaW1vG3SjVBwAAABJIfSix3r7+uu9vf2ZHU7gvcYHdKNUHAAAAEkh9CKK9o3Plmtojb3cGevzz7UapPgAAAJBA6kNADY1Nddu2x7kbpfoAAABAAqkPYfX29a9aU7tvf0u4L3H2bpTqAwAAAAmkPsSh9VDbyjW13SdPBXr8wd0o1QcAAAASSH2Iz8jSwNDNmzvn0kLli6++NtzfqD4AAAAQlPoQq67unlVra1sPvZmo/yr1AQAAgKDUhzLYuWt3zab6cLtRDpf6AAAAQFDqQ3n09vXXfX/7MzuakvAfoz4AAAAQlPpQTq2H2h57ov7I253l/c9QHwAAAAhKfSi/hsamum3by3ghhvoAAABAUOpDInR199Rsqt+3v6UsX119AAAAICj1IUH2NrfUbKrrPnkq5q+rPgAAABCU+pAsvX39DY3P129riPOLqg8AAAAEpT4kUXtHZ82mutZDb8bz5dQHAAAAglIfkmvnrt01m+pj2I1SfQAAACAo9SHRevv6a56oe/HV14J+FfUBAACAoNSHFGg91LZyTW243SjVBwAAAIJSH1Kj7vvbG3Y0hbgQQ30AAAAgKPUhTbq6e1atrS35bpTqAwAAAEGpD+mzt7mlZlNdCS/EUB8AAAAISn1Ipd6+/rrvb39mR1NJHk19AAAAICj1IcXaOzprNtWN/kIM9QEAAICg1IfUa2hsqtu2fTS7UaoPAAAABKU+ZEFvX/+qNbX79reM7LerDwAAAASlPmRH66G2lWtqR7AbpfoAAABAUOpD1tR9f3v9toZh/Rb1AQAAgKDUhwzq6u5ZtbZ26LtRqg8AAAAEpT5k1t7mllVra4eyG6X6AAAAQFDqQ5b19vXXfX/7MzuaLvzL1AcAAACCUh+yr/VQ22NP1B95u/N8v0B9AAAAICj1IS8aGpvqtm3/1Asx1AcAAACCUh9ypKu7p2ZT/b79Lef8e/UBAACAoNSH3Gk91LZyTW33yVOD/0Z9AAAAICj1IY96+/obGp+v39ZQ/Ef1AQAAgKDUh/zq6u5Ztba29dCb6gMAAABBqQ95t3PX7q9+5XbPAwAAAOGoDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGGpDwAAAEBY6gMAAAAQlvoAAAAAhKU+AAAAAGH9//ummMtyg0ETAAAAAElFTkSuQmCC';

    // let specialElementHandlers = {
    //   '#editor': function (element, renderer) {
    //     return true;
    //   }
    // };

    // var res = doc.autoTableHtmlToJson(document.getElementById("cart"));
    // doc.autoTable(res.columns, res.data, { margin: { top: 80 } });
    var width = 250;
    var height = 100;

    var header = function (data) {
      console.log(data);
      doc.setFontSize(18);
      doc.setTextColor(40);
      doc.setFontStyle('normal');
      doc.addImage(headerImgData, 'JPEG', 160, 20, width, height);
      // doc.text("GENTEC", data.settings.margin.left, 50);
    };
    var options = {
      didDrawPage: header,
      margin: {
        top: 80
      },
      // startY: doc.previousAutoTable.finalY + 20
    };
    // var res = doc.autoTableHtmlToJson(document.getElementById("cart"));
    doc.autoTable(options);
    doc.addPage();
    doc.autoTable({ html: document.getElementById("content") });

    doc.save("table.pdf");
    // let content = this.content.nativeElement;

    // doc.autoTable({ html: content.innerHTML })
    // let content = $('#content')[0];

    // doc.autoTable(content.innerHTML, margins.left, margins.top, {
    //   'width': margins.width,
    //   'elementHandlers': specialElementHandlers
    // });
    // doc.save('test.pdf');
  }

  downloadFile() {
    $('#exportFile').click();
  }

}
