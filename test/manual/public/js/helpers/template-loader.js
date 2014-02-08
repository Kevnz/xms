YUI.add('template-loader', function (Y) {
	Y.TemplateLoader = function(uri) {
		var cfg,
			request;
		// Create a configuration object for the synchronous transaction.
		cfg = {
			sync: true,
			arguments: { 'foo': 'bar' }
		};

		/*
		 * var request will contain the following fields, when the
		 * transaction is complete:
		 * - id
		 * - status
		 * - statusText
		 * - getResponseHeader()
		 * - getAllResponseHeaders()
		 * - responseText
		 * - responseXML
		 * - arguments
		 */
		request = Y.io(uri, cfg);

		return request.responseText;
	}
}, '0.0.1', {requires: ['io-base']})