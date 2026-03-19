        let libraryData = {
            books: JSON.parse(localStorage.getItem('books')) || [
                { id: 1, title: "الأبلة", author: "أحمد خالد توفيق", isbn: "9789771406364", category: "رواية", price: 4.550, quantity: 5, available: 5, description: "رواية رعب وخيال علمي" },
                { id: 2, title: "عزازيل", author: "يوسف زيدان", isbn: "9789773191726", category: "رواية تاريخية", price: 6.000, quantity: 3, available: 3, description: "رواية تاريخية عن الفترة البيزنطية" },
                { id: 3, title: "ذاكرة الجسد", author: "أحلام مستغانمي", isbn: "9789953447981", category: "رواية", price: 5.525, quantity: 4, available: 4, description: "رواية عن الحب والحرب" }
            ],
            members: JSON.parse(localStorage.getItem('members')) || [
                { id: 1, name: "محمد أحمد", email: "mohamed@email.com", phone: "0123456789", address: "المنامة", birthdate: "1990-05-15", joinDate: "2024-01-15", status: "نشط" },
                { id: 2, name: "فاطمة محمود", email: "fatima@email.com", phone: "0111222333", address: "الرفاع", birthdate: "1992-08-22", joinDate: "2024-02-20", status: "نشط" }
            ],
            borrowRecords: JSON.parse(localStorage.getItem('borrowRecords')) || [
                { id: 1, bookId: 1, memberId: 1, borrowDate: "2024-03-01", dueDate: "2024-03-15", returnDate: null, status: "مستعارة", notes: "" },
                { id: 2, bookId: 2, memberId: 2, borrowDate: "2024-03-05", dueDate: "2024-03-19", returnDate: null, status: "مستعارة", notes: "" }
            ],
            settings: JSON.parse(localStorage.getItem('settings')) || {
                libraryName: "مكتبة المعرفة",
                borrowPeriod: 14,
                dailyFine: 5
            }
        };

        // إعدادات اللغة والثيم
        let currentLanguage = 'ar';
        let currentTheme = 'light';

        // تبديل اللغة
        function toggleLanguage() {
            currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
            updateLanguage();
            saveSettings();
        }

        function updateLanguage() {
            document.querySelectorAll('[data-lang]').forEach(element => {
                element.style.display = element.getAttribute('data-lang') === currentLanguage ? '' : 'none';
            });

            document.querySelectorAll('[data-lang-placeholder-ar]').forEach(element => {
                if (currentLanguage === 'ar') {
                    element.placeholder = element.getAttribute('data-lang-placeholder-ar');
                } else {
                    element.placeholder = element.getAttribute('data-lang-placeholder-en');
                }
            });

            document.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
            document.documentElement.lang = currentLanguage;
        }

        // تبديل الوضع الليلي
        function toggleTheme() {
            currentTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', currentTheme);
            
            const themeButton = document.querySelector('.theme-toggle');
            if (currentTheme === 'dark') {
                themeButton.innerHTML = '<i class="fas fa-sun"></i> ' + 
                    (currentLanguage === 'ar' ? 'الوضع النهاري' : 'Light Mode');
            } else {
                themeButton.innerHTML = '<i class="fas fa-moon"></i> ' + 
                    (currentLanguage === 'ar' ? 'الوضع الليلي' : 'Dark Mode');
            }
            
            saveSettings();
        }

        // تهيئة الإعدادات
        function initializeSettings() {
            const savedTheme = localStorage.getItem('theme');
            const savedLanguage = localStorage.getItem('language');
            
            if (savedTheme) {
                currentTheme = savedTheme;
                document.documentElement.setAttribute('data-theme', currentTheme);
            }
            
            if (savedLanguage) {
                currentLanguage = savedLanguage;
            }
            
            updateLanguage();
            
            const themeButton = document.querySelector('.theme-toggle');
            if (currentTheme === 'dark') {
                themeButton.innerHTML = '<i class="fas fa-sun"></i> ' + 
                    (currentLanguage === 'ar' ? 'الوضع النهاري' : 'Light Mode');
            }

            // تحميل إعدادات المكتبة
            document.getElementById('libraryName').value = libraryData.settings.libraryName;
            document.getElementById('borrowPeriod').value = libraryData.settings.borrowPeriod;
            document.getElementById('dailyFine').value = libraryData.settings.dailyFine;
        }

        // حفظ الإعدادات
        function saveSettings() {
            localStorage.setItem('theme', currentTheme);
            localStorage.setItem('language', currentLanguage);
        }

        // حفظ البيانات في localStorage
        function saveData() {
            localStorage.setItem('books', JSON.stringify(libraryData.books));
            localStorage.setItem('members', JSON.stringify(libraryData.members));
            localStorage.setItem('borrowRecords', JSON.stringify(libraryData.borrowRecords));
            localStorage.setItem('settings', JSON.stringify(libraryData.settings));
        }

        // وظائف التنقل بين الصفحات
        function showPage(pageId) {
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            document.querySelectorAll('.menu-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            document.getElementById(pageId).classList.add('active');
            event.target.classList.add('active');

            updatePageData(pageId);
        }

        function updatePageData(pageId) {
            switch(pageId) {
                case 'dashboard':
                    updateDashboard();
                    break;
                case 'books':
                    updateBooksTable();
                    break;
                case 'members':
                    updateMembersTable();
                    break;
                case 'borrow':
                    updateBorrowTable();
                    break;
                case 'reports':
                    updateReports();
                    break;
                case 'settings':
                    loadSettings();
                    break;
            }
        }

        // تحديث لوحة التحكم
        function updateDashboard() {
            const totalBooks = libraryData.books.reduce((sum, book) => sum + book.quantity, 0);
            const totalMembers = libraryData.members.length;
            const activeBorrows = libraryData.borrowRecords.filter(record => record.status === 'مستعارة').length;
            const totalRevenue = libraryData.books.reduce((sum, book) => sum + (book.price * (book.quantity - book.available)), 0);

            document.getElementById('totalBooks').textContent = totalBooks;
            document.getElementById('totalMembers').textContent = totalMembers;
            document.getElementById('borrowedBooks').textContent = activeBorrows;
            document.getElementById('totalRevenue').textContent = totalRevenue.toFixed(2);

            // تحديث جدول أحدث الكتب
            const recentBooksTbody = document.querySelector('#recentBooks tbody');
            recentBooksTbody.innerHTML = '';
            libraryData.books.slice(-5).reverse().forEach(book => {
                recentBooksTbody.innerHTML += `
                    <tr>
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.category}</td>
                        <td>${book.price} دينار</td>
                        <td><span style="color: ${book.available > 0 ? 'green' : 'red'};">${book.available > 0 ? 'متاح' : 'غير متاح'}</span></td>
                    </tr>
                `;
            });

            // تحديث جدول آخر الاستعارات
            const recentBorrowsTbody = document.querySelector('#recentBorrows tbody');
            recentBorrowsTbody.innerHTML = '';
            libraryData.borrowRecords.slice(-5).reverse().forEach(record => {
                const book = libraryData.books.find(b => b.id === record.bookId);
                const member = libraryData.members.find(m => m.id === record.memberId);
                if (book && member) {
                    recentBorrowsTbody.innerHTML += `
                        <tr>
                            <td>${member.name}</td>
                            <td>${book.title}</td>
                            <td>${record.borrowDate}</td>
                            <td>${record.dueDate}</td>
                            <td><span style="color: ${record.status === 'مستعارة' ? 'orange' : 'green'};">${record.status}</span></td>
                        </tr>
                    `;
                }
            });
        }

        // تحديث جدول الكتب
        function updateBooksTable() {
            const tbody = document.querySelector('#booksTable tbody');
            tbody.innerHTML = '';
            libraryData.books.forEach(book => {
                tbody.innerHTML += `
                    <tr>
                        <td>${book.id}</td>
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.category}</td>
                        <td>${book.price} دينار</td>
                        <td>${book.available} / ${book.quantity}</td>
                        <td><span style="color: ${book.available > 0 ? 'green' : 'red'};">${book.available > 0 ? 'متاح' : 'غير متاح'}</span></td>
                        <td>
                            <button class="btn btn-primary" onclick="editBook(${book.id})">تعديل</button>
                            <button class="btn btn-danger" onclick="deleteBook(${book.id})">حذف</button>
                        </td>
                    </tr>
                `;
            });
        }

        // تحديث جدول الأعضاء
        function updateMembersTable() {
            const tbody = document.querySelector('#membersTable tbody');
            tbody.innerHTML = '';
            libraryData.members.forEach(member => {
                tbody.innerHTML += `
                    <tr>
                        <td>${member.id}</td>
                        <td>${member.name}</td>
                        <td>${member.email}</td>
                        <td>${member.phone}</td>
                        <td>${member.address}</td>
                        <td>${member.joinDate}</td>
                        <td><span style="color: green;">${member.status}</span></td>
                        <td>
                            <button class="btn btn-primary" onclick="editMember(${member.id})">تعديل</button>
                            <button class="btn btn-danger" onclick="deleteMember(${member.id})">حذف</button>
                        </td>
                    </tr>
                `;
            });
        }

        // تحديث جدول الاستعارة
        function updateBorrowTable() {
            const activeBorrows = libraryData.borrowRecords.filter(record => record.status === 'مستعارة');
            const overdueBorrows = activeBorrows.filter(record => {
                const dueDate = new Date(record.dueDate);
                return dueDate < new Date();
            });

            document.getElementById('activeBorrows').textContent = activeBorrows.length;
            document.getElementById('overdueBooks').textContent = overdueBorrows.length;
            document.getElementById('borrowRate').textContent = Math.round((activeBorrows.length / libraryData.books.reduce((sum, book) => sum + book.quantity, 0)) * 100) + '%';

            const tbody = document.querySelector('#borrowTable tbody');
            tbody.innerHTML = '';
            activeBorrows.forEach(record => {
                const book = libraryData.books.find(b => b.id === record.bookId);
                const member = libraryData.members.find(m => m.id === record.memberId);
                if (book && member) {
                    const dueDate = new Date(record.dueDate);
                    const today = new Date();
                    const daysRemaining = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
                    
                    tbody.innerHTML += `
                        <tr>
                            <td>${record.id}</td>
                            <td>${member.name}</td>
                            <td>${book.title}</td>
                            <td>${record.borrowDate}</td>
                            <td>${record.dueDate}</td>
                            <td style="color: ${daysRemaining < 0 ? 'red' : daysRemaining <= 3 ? 'orange' : 'green'}">
                                ${daysRemaining < 0 ? 'متأخر ' + Math.abs(daysRemaining) + ' يوم' : daysRemaining + ' يوم'}
                            </td>
                            <td>
                                <button class="btn btn-success" onclick="returnBook(${record.id})">إرجاع</button>
                                <button class="btn btn-warning" onclick="extendBorrow(${record.id})">تمديد</button>
                            </td>
                        </tr>
                    `;
                }
            });
        }

        // تحديث التقارير
        function updateReports() {
            const totalBooks = libraryData.books.reduce((sum, book) => sum + book.quantity, 0);
            const activeBorrows = libraryData.borrowRecords.filter(record => record.status === 'مستعارة').length;
            const activeMembers = libraryData.members.filter(member => member.status === 'نشط').length;
            const monthlyRevenue = libraryData.books.reduce((sum, book) => sum + (book.price * (book.quantity - book.available)), 0);

            document.getElementById('borrowPercentage').textContent = Math.round((activeBorrows / totalBooks) * 100) + '%';
            document.getElementById('popularBooks').textContent = '5';
            document.getElementById('activeMembers').textContent = activeMembers;
            document.getElementById('monthlyRevenue').textContent = monthlyRevenue.toFixed(2);

            // تحديث جدول الكتب الأكثر إعارة
            const popularTbody = document.querySelector('#popularBooksTable tbody');
            popularTbody.innerHTML = '';
            libraryData.books.slice(0, 5).forEach(book => {
                const borrowCount = libraryData.borrowRecords.filter(record => record.bookId === book.id).length;
                popularTbody.innerHTML += `
                    <tr>
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${borrowCount}</td>
                        <td>${book.category}</td>
                    </tr>
                `;
            });

            // تحديث جدول الأعضاء النشطين
            const activeMembersTbody = document.querySelector('#activeMembersTable tbody');
            activeMembersTbody.innerHTML = '';
            libraryData.members.slice(0, 5).forEach(member => {
                const borrowCount = libraryData.borrowRecords.filter(record => record.memberId === member.id).length;
                activeMembersTbody.innerHTML += `
                    <tr>
                        <td>${member.name}</td>
                        <td>${borrowCount}</td>
                        <td>${member.joinDate}</td>
                        <td><span style="color: green;">${member.status}</span></td>
                    </tr>
                `;
            });
        }

        // إدارة النماذج المنبثقة
        function showModal(modalId) {
            document.getElementById(modalId).style.display = 'block';
            
            if (modalId === 'borrowBookModal') {
                updateBorrowModal();
            }
        }

        function hideModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
        }

        function updateBorrowModal() {
            const memberSelect = document.getElementById('borrowMember');
            const bookSelect = document.getElementById('borrowBook');
            
            memberSelect.innerHTML = '<option value="" data-lang="ar">اختر العضو</option><option value="" data-lang="en" style="display: none;">Select Member</option>';
            bookSelect.innerHTML = '<option value="" data-lang="ar">اختر الكتاب</option><option value="" data-lang="en" style="display: none;">Select Book</option>';
            
            libraryData.members.forEach(member => {
                memberSelect.innerHTML += `<option value="${member.id}">${member.name}</option>`;
            });
            
            libraryData.books.forEach(book => {
                if (book.available > 0) {
                    bookSelect.innerHTML += `<option value="${book.id}">${book.title} - ${book.author}</option>`;
                }
            });
        }

        // إضافة كتاب جديد
        document.getElementById('addBookForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newBook = {
                id: Math.max(...libraryData.books.map(b => b.id), 0) + 1,
                title: document.getElementById('bookTitle').value,
                author: document.getElementById('bookAuthor').value,
                isbn: document.getElementById('bookISBN')?.value || '',
                category: document.getElementById('bookCategory').value,
                price: parseFloat(document.getElementById('bookPrice').value),
                quantity: parseInt(document.getElementById('bookQuantity').value),
                available: parseInt(document.getElementById('bookQuantity').value),
                description: document.getElementById('bookDescription')?.value || ''
            };
            
            libraryData.books.push(newBook);
            saveData();
            updateBooksTable();
            updateDashboard();
            hideModal('addBookModal');
            this.reset();
            
            showAlert('تم إضافة الكتاب بنجاح! 📚', 'success');
        });

        // إضافة عضو جديد
        document.getElementById('addMemberForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newMember = {
                id: Math.max(...libraryData.members.map(m => m.id), 0) + 1,
                name: document.getElementById('memberName').value,
                email: document.getElementById('memberEmail').value,
                phone: document.getElementById('memberPhone').value,
                address: document.getElementById('memberAddress').value,
                birthdate: document.getElementById('memberBirthdate')?.value || new Date().toISOString().split('T')[0],
                joinDate: new Date().toISOString().split('T')[0],
                status: 'نشط'
            };
            
            libraryData.members.push(newMember);
            saveData();
            updateMembersTable();
            updateDashboard();
            hideModal('addMemberModal');
            this.reset();
            
            showAlert('تم إضافة العضو بنجاح! 👥', 'success');
        });

        // استعارة كتاب
        document.getElementById('borrowBookForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const memberId = parseInt(document.getElementById('borrowMember').value);
            const bookId = parseInt(document.getElementById('borrowBook').value);
            const borrowDays = parseInt(document.getElementById('borrowDays').value);
            
            const book = libraryData.books.find(b => b.id === bookId);
            if (book && book.available > 0) {
                const borrowDate = new Date().toISOString().split('T')[0];
                const dueDate = new Date();
                dueDate.setDate(dueDate.getDate() + borrowDays);
                
                const newRecord = {
                    id: Math.max(...libraryData.borrowRecords.map(r => r.id), 0) + 1,
                    bookId: bookId,
                    memberId: memberId,
                    borrowDate: borrowDate,
                    dueDate: dueDate.toISOString().split('T')[0],
                    returnDate: null,
                    status: 'مستعارة',
                    notes: ''
                };
                
                book.available--;
                libraryData.borrowRecords.push(newRecord);
                saveData();
                updateBorrowTable();
                updateDashboard();
                hideModal('borrowBookModal');
                this.reset();
                
                showAlert('تمت الاستعارة بنجاح! 🔄', 'success');
            } else {
                showAlert('الكتاب غير متاح للإعارة!', 'danger');
            }
        });

        // إرجاع كتاب
        function returnBook(recordId) {
            const record = libraryData.borrowRecords.find(r => r.id === recordId);
            if (record) {
                const book = libraryData.books.find(b => b.id === record.bookId);
                if (book) {
                    book.available++;
                    record.status = 'تم الإرجاع';
                    record.returnDate = new Date().toISOString().split('T')[0];
                    saveData();
                    updateBorrowTable();
                    updateDashboard();
                    showAlert('تم إرجاع الكتاب بنجاح! ✅', 'success');
                }
            }
        }

        // تمديد الاستعارة
        function extendBorrow(recordId) {
            const record = libraryData.borrowRecords.find(r => r.id === recordId);
            if (record) {
                const dueDate = new Date(record.dueDate);
                dueDate.setDate(dueDate.getDate() + 7); // تمديد أسبوع
                record.dueDate = dueDate.toISOString().split('T')[0];
                saveData();
                updateBorrowTable();
                showAlert('تم تمديد الاستعارة لمدة أسبوع! 📅', 'success');
            }
        }

        // حذف كتاب
        function deleteBook(bookId) {
            if (confirm('هل أنت متأكد من حذف هذا الكتاب؟')) {
                libraryData.books = libraryData.books.filter(book => book.id !== bookId);
                saveData();
                updateBooksTable();
                updateDashboard();
                showAlert('تم حذف الكتاب بنجاح', 'success');
            }
        }

        // حذف عضو
        function deleteMember(memberId) {
            if (confirm('هل أنت متأكد من حذف هذا العضو؟')) {
                libraryData.members = libraryData.members.filter(member => member.id !== memberId);
                saveData();
                updateMembersTable();
                updateDashboard();
                showAlert('تم حذف العضو بنجاح', 'success');
            }
        }

        // تحرير كتاب (وظيفة أساسية)
        function editBook(bookId) {
            const book = libraryData.books.find(b => b.id === bookId);
            if (book) {
                document.getElementById('bookTitle').value = book.title;
                document.getElementById('bookAuthor').value = book.author;
                document.getElementById('bookCategory').value = book.category;
                document.getElementById('bookPrice').value = book.price;
                document.getElementById('bookQuantity').value = book.quantity;
                showModal('addBookModal');
                // يمكن إضافة منطق التحديث هنا
            }
        }

        // تحرير عضو (وظيفة أساسية)
        function editMember(memberId) {
            const member = libraryData.members.find(m => m.id === memberId);
            if (member) {
                document.getElementById('memberName').value = member.name;
                document.getElementById('memberEmail').value = member.email;
                document.getElementById('memberPhone').value = member.phone;
                document.getElementById('memberAddress').value = member.address;
                showModal('addMemberModal');
                // يمكن إضافة منطق التحديث هنا
            }
        }

        // حفظ إعدادات النظام
        function saveSettings() {
            libraryData.settings = {
                libraryName: document.getElementById('libraryName').value,
                borrowPeriod: parseInt(document.getElementById('borrowPeriod').value),
                dailyFine: parseInt(document.getElementById('dailyFine').value)
            };
            saveData();
            showAlert('تم حفظ الإعدادات بنجاح! ⚙️', 'success');
        }

        // تحميل الإعدادات
        function loadSettings() {
            document.getElementById('libraryName').value = libraryData.settings.libraryName;
            document.getElementById('borrowPeriod').value = libraryData.settings.borrowPeriod;
            document.getElementById('dailyFine').value = libraryData.settings.dailyFine;
            
            // تحديث إحصائيات التخزين
            const storageUsage = Math.round((JSON.stringify(libraryData).length / 5000) * 100);
            document.getElementById('storageUsage').textContent = storageUsage + '%';
            document.getElementById('totalOperations').textContent = libraryData.borrowRecords.length + libraryData.books.length + libraryData.members.length;
        }

        // التصدير والاستيراد
        function exportData() {
            const dataStr = JSON.stringify(libraryData, null, 2);
            const dataBlob = new Blob([dataStr], {type: 'application/json'});
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'library_backup.json';
            link.click();
            URL.revokeObjectURL(url);
            showAlert('تم تصدير البيانات بنجاح! 💾', 'success');
        }

        function importData() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = e => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = event => {
                    try {
                        const importedData = JSON.parse(event.target.result);
                        libraryData = importedData;
                        saveData();
                        updateDashboard();
                        updateBooksTable();
                        updateMembersTable();
                        updateBorrowTable();
                        showAlert('تم استيراد البيانات بنجاح! 📥', 'success');
                    } catch (error) {
                        showAlert('خطأ في استيراد البيانات!', 'danger');
                    }
                };
                reader.readAsText(file);
            };
            input.click();
        }

        // تنبيهات
        function showAlert(message, type) {
            const alert = document.createElement('div');
            alert.className = `alert alert-${type}`;
            alert.textContent = message;
            alert.style.position = 'fixed';
            alert.style.top = '20px';
            alert.style.right = '20px';
            alert.style.zIndex = '1001';
            alert.style.minWidth = '300px';
            alert.style.textAlign = 'right';
            
            document.body.appendChild(alert);
            
            setTimeout(() => {
                alert.remove();
            }, 3000);
        }

        // البحث
        document.getElementById('searchBooks').addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const rows = document.querySelectorAll('#booksTable tbody tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });

        document.getElementById('searchMembers').addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const rows = document.querySelectorAll('#membersTable tbody tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });

        // إغلاق النماذج عند النقر خارج المحتوى
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.style.display = 'none';
                }
            });
        });

        // عند تحميل الصفحة
        document.addEventListener('DOMContentLoaded', function() {
            initializeSettings();
            updateDashboard();
            updateBooksTable();
            updateMembersTable();
            updateBorrowTable();
            updateReports();
            loadSettings();
        });

        // حفظ الإعدادات عند الخروج
        window.addEventListener('beforeunload', saveSettings);