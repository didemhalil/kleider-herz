document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('spendenForm');
    const successMessage = document.getElementById('successMessage');
    const abgabeRadioButtons = document.querySelectorAll('input[name="abgabe"]');
    const addressDiv = document.getElementById('addressDiv');
    const adresseInput = document.getElementById('adresse');

    // Die Postleitzahl der Geschäftsstelle
    const branchZip = "10115"; // Beispiel-PLZ der Geschäftsstelle

    // Funktion, um die Abholadresse und Sammelstation zu prüfen
    function checkNearbyStation(zip) {
        const branchZipPrefix = branchZip.substring(0, 2); // Die ersten beiden Ziffern der Geschäftsstelle
        const userZipPrefix = zip.substring(0, 2); // Die ersten beiden Ziffern der Nutzer-Adresse
        return branchZipPrefix === userZipPrefix; // Wenn die ersten beiden Ziffern übereinstimmen
    }

    // Zeigt das Abholadresse-Feld an, wenn "Sammelfahrzeug" ausgewählt ist
    abgabeRadioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'sammelfahrzeug') {
                addressDiv.style.display = 'block';
                adresseInput.required = true;   // Adresse als erforderlich markieren
            } else {
                addressDiv.style.display = 'none';
                adresseInput.required = false; // Adresse als nicht erforderlich markieren
            }
        });
    });

    // Formular absenden
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const vorname = document.getElementById('vorname').value.trim();
        const nachname = document.getElementById('nachname').value.trim();
        const kleidung = document.getElementById('kleidung').value;
        const krisenregion = document.getElementById('krisenregion').value;
        const abgabe = document.querySelector('input[name="abgabe"]:checked').value;
        const adresse = abgabe === 'sammelfahrzeug' ? adresseInput.value.trim() : '';

        // Überprüfen, ob eine Übergabeoption gewählt wurde
        if (!abgabe) {
            alert('Bitte wählen Sie eine Übergabeoption aus.');
            return;
        }

        // Wenn "Sammelfahrzeug" gewählt wurde
        if (abgabe === 'sammelfahrzeug') {
            // Überprüfen, ob eine Abholadresse eingegeben wurde
            if (!adresse) {
                alert('Bitte geben Sie Ihre Abholadresse ein.');
                return;
            }

            // Prüfen, ob die Postleitzahl "79" enthält
            if (adresse.includes("79")) {
                const userResponse = confirm('In der Nähe von Ihnen befindet sich eine Sammelstation. Möchten Sie trotzdem das Sammelfahrzeug anfordern?');
                if (userResponse) {
                    // Bestätigungsmeldung mit allen Details
                    successMessage.innerHTML = `
                        Registrierung erfolgreich! Das Sammelfahrzeug wird zu Ihrer Adresse kommen.<br>
                        Vorname: ${vorname}<br>
                        Nachname: ${nachname}<br>
                        Art der Kleidung: ${kleidung}<br>
                        Krisenregion: ${krisenregion}<br>
                        Abholadresse: ${adresse}
                    `;
                    successMessage.style.display = 'block';
                    form.reset();
                    addressDiv.style.display = 'none';
                    return;
                } else {
                    alert('Bitte bringen Sie Ihre Spende zur nächstgelegenen Sammelstation.');
                    return;
                }
            } else {
                // Wenn die Postleitzahl nicht "79" enthält und die Abholadresse in der Nähe ist
                if (checkNearbyStation(adresse)) {
                    const userResponse = confirm('In der Nähe von Ihnen befindet sich eine Abgabestation. Möchten Sie die Spende stattdessen selbst dort abgeben?');
                    if (userResponse) {
                        alert('Bitte bringen Sie Ihre Spende zur nächstgelegenen Abgabestation.');
                        return;
                    } else {
                        successMessage.innerHTML = `
                            Registrierung erfolgreich! Das Sammelfahrzeug wird zu Ihrer Adresse kommen.<br>
                            Vorname: ${vorname}<br>
                            Nachname: ${nachname}<br>
                            Art der Kleidung: ${kleidung}<br>
                            Krisenregion: ${krisenregion}<br>
                            Abholadresse: ${adresse}
                        `;
                        successMessage.style.display = 'block';
                        form.reset();
                        addressDiv.style.display = 'none';
                        return;
                    }
                } else {
                    // Wenn die Postleitzahl nicht mit der Geschäftsstelle übereinstimmt, wird **keine** Warnung angezeigt
                    successMessage.innerHTML = `
                        Registrierung erfolgreich! Das Sammelfahrzeug wird zu Ihrer Adresse kommen.<br>
                        Vorname: ${vorname}<br>
                        Nachname: ${nachname}<br>
                        Art der Kleidung: ${kleidung}<br>
                        Krisenregion: ${krisenregion}<br>
                        Abholadresse: ${adresse}
                    `;
                    successMessage.style.display = 'block';
                    form.reset();
                    addressDiv.style.display = 'none';
                    return;
                }
            }
        }

        // Wenn "Persönlich abgeben" gewählt wurde
        if (abgabe === 'abgabe') {
            successMessage.innerHTML = `
                Registrierung erfolgreich! Vielen Dank für Ihre Spende!<br>
                Vorname: ${vorname}<br>
                Nachname: ${nachname}<br>
                Art der Kleidung: ${kleidung}<br>
                Krisenregion: ${krisenregion}<br>
                Übergabemethode: Persönlich abgeben
            `;
            successMessage.style.display = 'block';
            form.reset();
            addressDiv.style.display = 'none';
        }
    });
});



