/**
 * FOMO Timer Logic
 * Handles the countdown and "Extended" offer state using localStorage.
 */

(function () {
    const CONFIG = {
        initialDurationHours: 4,
        extendedDurationHours: 2,
        storageKey: 'baklava_fomo_state_v1' // Versioned key to avoid conflicts
    };

    const ELEMENTS = {
        containerId: 'fomo-timer-container',
        textId: 'fomo-timer-text'
    };

    function initTimer() {
        const container = document.getElementById(ELEMENTS.containerId);
        if (!container) return; // Guard clause if element not found

        let state = getStoredState();
        const now = Date.now();

        // Initialize or update state logic
        if (!state) {
            // First visit
            state = createNewState('initial', CONFIG.initialDurationHours);
            saveState(state);
        } else if (now > state.deadline) {
            // Expired
            if (state.status === 'initial') {
                // Switch to extended
                state = createNewState('extended', CONFIG.extendedDurationHours);
                saveState(state);
            } else if (state.status === 'extended') {
                // Extended also expired? dynamic refresh
                // "Everytime it finishes" -> loop it or keep extending
                // User input: "dynamically refrech everytime it finishes and for the returning user it says Extended"
                // Let's just reset the extended timer again to keep the pressure up
                state = createNewState('extended', CONFIG.extendedDurationHours);
                saveState(state);
            }
        }

        // render immediately then interval
        updateDisplay(container, state);

        setInterval(() => {
            const currentNow = Date.now();
            if (currentNow > state.deadline) {
                // Handle expiration during active session
                if (state.status === 'initial') {
                    state = createNewState('extended', CONFIG.extendedDurationHours);
                    saveState(state);
                } else {
                    // Refresh extended
                    state = createNewState('extended', CONFIG.extendedDurationHours);
                    saveState(state);
                }
            }
            updateDisplay(container, state);
        }, 1000);
    }

    function createNewState(status, durationHours) {
        return {
            status: status,
            deadline: Date.now() + (durationHours * 60 * 60 * 1000)
        };
    }

    function getStoredState() {
        try {
            const stored = localStorage.getItem(CONFIG.storageKey);
            return stored ? JSON.parse(stored) : null;
        } catch (e) {
            console.error('FOMO: Error reading storage', e);
            return null;
        }
    }

    function saveState(state) {
        try {
            localStorage.setItem(CONFIG.storageKey, JSON.stringify(state));
        } catch (e) {
            console.error('FOMO: Error saving storage', e);
        }
    }

    function updateDisplay(container, state) {
        const now = Date.now();
        const diff = state.deadline - now;

        if (diff <= 0) return; // Should be handled by refresh logic, but safety check

        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const hStr = hours.toString().padStart(2, '0');
        const mStr = minutes.toString().padStart(2, '0');
        const sStr = seconds.toString().padStart(2, '0');

        let text = '';
        if (state.status === 'initial') {
            // "X hours left, 10 euro only (discounted from 15€)"
            text = `<span style="color: #ff4444; font-weight: bold;">${hStr}:${mStr}:${sStr}</span> left <span style="opacity:0.5">|</span> <span style="text-decoration: line-through; opacity: 0.6;">15€</span> <span style="color: #44ff44; font-weight: bold;">10€ ONLY</span>`;
        } else {
            // "Extended: X hours left for discount to finish"
            text = `<span style="color: #ffaa00; font-weight: bold;">Extended:</span> ${hStr}:${mStr}:${sStr} left for discount to finish`;
        }

        container.innerHTML = text;
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTimer);
    } else {
        initTimer();
    }

})();
