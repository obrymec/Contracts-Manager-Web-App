// Attributes.
window.avb_emp_crud = new CrudView ("div.availables-employees", window.emps_keys, "avb-emp");

// Called when this web page is fulled loaded.
$ (() => {
	// Fixing "click" event on refresh button.
	$ (window.avb_emp_crud.get_refresh_button_id ()).click (() => {
		// Loads availables employees.
		if (network_manager ()) load_availables_employees ();
	});
	// Fixing "click" event on crud add button.
	$ (window.avb_emp_crud.get_add_button_id ()).click (() => generic_task ("add-employee", "Inscription d'un employé"));
	// Destroys the preview variable.
	destroy_props (["afd_emp_crud"]);
	// Sets buttons title.
	sets_crud_btns_title ("un employé.", window.avb_emp_crud);
	// Loads logged employees.
	make_request ("/employees-availables", "GET", new Object ({}), server => {
		// Loading availables employees.
		if (Array.isArray (server.data) && server.data.length > 0) server.data.forEach ((element, index) => {
			// Filtering all parts of the loaded employee date.
			const date = element ["Date d'enregistrement"].split ('-');
			// Draws all logged employees.
			draw_employee (new Object ({
				"Date d'enregistrement": parse_date (parseInt (date [2]), parseInt (date [1]), parseInt (date [0])), disabled: ["ID"],
				ID: element._id, Nom: element.Nom.toUpperCase (), "Prénom(s)": str_capitalize (element ["Prénom(s)"])
			}), window.avb_emp_crud, index, server.data.length);
		});
		// Listens crud data.
		listen_crud_data (window.avb_emp_crud);
	});
	// Removes this script.
	$ ("script").remove ();
});
