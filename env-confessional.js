#!/usr/bin/env node

// ENV Var Confessional - Where your environment variables come to confess their sins
// Because production shouldn't be a surprise party where everything breaks

const fs = require('fs');
const path = require('path');

// The sacred scripture of expected variables
const EXPECTED_VARS = {
    // Database sins
    'DATABASE_URL': 'string',
    'DB_PASSWORD': 'string',
    
    // API confessionals
    'API_KEY': 'string',
    'API_SECRET': 'string',
    
    // Feature flag felonies
    'ENABLE_FEATURE_X': 'boolean',
    'DEBUG_MODE': 'boolean',
    
    // Numeric naughtiness
    'PORT': 'number',
    'TIMEOUT_MS': 'number'
};

// The judgment begins
function confess() {
    console.log('\n🔍 ENVIRONMENT VARIABLE CONFESSIONAL 🔍');
    console.log('Let\'s see what sins we\'ve committed today...\n');
    
    let sins = 0;
    let virtues = 0;
    
    for (const [varName, expectedType] of Object.entries(EXPECTED_VARS)) {
        const value = process.env[varName];
        
        if (value === undefined) {
            console.log(`❌ ${varName}: MISSING - "I confess, I never showed up to work"`);
            sins++;
            continue;
        }
        
        // Type checking - because "123" is a string, not a number (surprise!)
        let typeMatch = false;
        switch (expectedType) {
            case 'string':
                typeMatch = typeof value === 'string';
                break;
            case 'number':
                typeMatch = !isNaN(Number(value)) && value.trim() !== '';
                break;
            case 'boolean':
                const lowerVal = value.toLowerCase();
                typeMatch = lowerVal === 'true' || lowerVal === 'false' || lowerVal === '1' || lowerVal === '0';
                break;
        }
        
        if (!typeMatch) {
            console.log(`⚠️  ${varName}: WRONG TYPE - "I said I was ${expectedType}, but I\'m actually ${typeof value}"`);
            sins++;
        } else {
            console.log(`✅ ${varName}: Present and correct - "No sins to confess today!"`);
            virtues++;
        }
    }
    
    // Final judgment
    console.log('\n📊 CONFESSION SUMMARY:');
    console.log(`   Virtues: ${virtues}`);
    console.log(`   Sins: ${sins}`);
    
    if (sins === 0) {
        console.log('\n🎉 All environment variables are absolved! Go forth and deploy!');
    } else {
        console.log(`\n🙏 ${sins} sin(s) need absolution before production.`);
        process.exit(1);
    }
}

// Check if we're being run directly
if (require.main === module) {
    confess();
}

module.exports = { confess, EXPECTED_VARS };
