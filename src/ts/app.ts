import './menu-dropdown';
import * as $ from 'jquery';
import 'parsleyjs/dist/parsley.min.js';

declare var PaystackPop: any;

jQuery(function () {
  jQuery('.js-slick').slick();
  AOS.init();

  const pdfWebViewer = document.querySelector('.pdfviewer-canvas');
  if (pdfWebViewer) {
    WebViewer(
      {
        initialDoc:
          'https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf',
      },
      document.querySelector('.pdfviewer-canvas')
    );
  }

  if ($('.ebook-purchase-form').length > 0) {
    ($('.ebook-purchase-form') as any)
      .parsley()
      .on('form:submit', function () {
        return false;
      })
      .on('form:success', function () {
        let handler = PaystackPop.setup({
          key: "{{paystack_public_key}}",
          email: (
            document.querySelector("input[name='email']") as HTMLInputElement
          )?.value,
          amount: getTotalPrice(),
          channels: [
            'card',
            'bank',
            'ussd',
            'qr',
            'mobile_money',
            'bank_transfer',
          ],
          metadata: {
            custom_fields: [
              {
                display_name: 'First Name',
                variable_name: 'first_name',
                value: (
                  document.querySelector(
                    "input[name='first_name']"
                  ) as HTMLInputElement
                )?.value,
              },
              {
                display_name: 'Last Name',
                variable_name: 'last_name',
                value: (
                  document.querySelector(
                    "input[name='last_name']"
                  ) as HTMLInputElement
                )?.value,
              },
              {
                display_name: 'Email',
                variable_name: 'email',
                value: (
                  document.querySelector(
                    "input[name='email']"
                  ) as HTMLInputElement
                )?.value,
              },
            ],
          },
          callback: function (response: any) {
            // let message = `Payment complete !Reference: ${response.reference}`;
            // console.log(message);
            $('.form-container').html(
              `<div class="purchase-success">
            <h2 class="c-gradient">Thank you ${
              (document.querySelector(
                'input[name="first_name"]'
              ) as HTMLInputElement).value} for your purchase!</h2>
            <p>You will receive an email shortly with a link to download your copy of the ebook.</p>
          </div>`
            );
            ($('.js-slick') as any).slick('slickGoTo', 2);
            document.querySelector('.js-slick').scrollIntoView(true);
          },
        });

        handler.openIframe();
        return false;
      });
  }
});

function getTotalPrice(): number {
  const price = parseFloat($('#ebook-price').attr('data-price'));
  return price * 100;
}
